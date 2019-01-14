import { Injectable } from '@angular/core';
import { DailyExpense } from "../domain/dailyExpense";
import { Consumption } from "../domain/consumption";

@Injectable({providedIn: 'root'})
export class DailyExpenseService {
    getDailyExpense(date:Date) {
        let jsonData = {
            "datetime": "2018-04-12T12:41:56.385Z",
            "consumptions": [
                {
                    "amount": 1000,
                    "desc": "stop wasting"
                },
                {
                    "amount": 2000,
                    "desc": "I know you did"
                }
            ]
        };
        let dailyExpense = this.fromJson(jsonData);
        return dailyExpense
    }

    fromJson(jsonObject){
        let dailyExpense = new DailyExpense();
        dailyExpense.consumptions = new Array<Consumption>();
        dailyExpense.datetime = new Date(jsonObject["datetime"]).toISOString().slice(0, 10);
        let consumptionsArray = jsonObject["consumptions"];
        if(consumptionsArray){
            consumptionsArray.forEach((element) => {
                let consumption = new Consumption(element["amount"], element["desc"]);
                dailyExpense.consumptions.push(consumption)
            });
        }
        return dailyExpense;
    }
}