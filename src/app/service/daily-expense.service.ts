import { Injectable } from '@angular/core';
import { DailyExpense } from "../domain/dailyExpense";

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
        let dailyExpense = new DailyExpense().fromJson(jsonData);
        return dailyExpense
    }
}