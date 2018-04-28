import { Consumption } from "./consumption";

export class DailyExpense{
    datetime: Date;
    consumptions: Array<Consumption>;

    constructor(){
        this.datetime = new Date();
        this.consumptions = new Array<Consumption>();
    }

    setDate(date:Date){
        this.datetime = date;
    }

    addConsumption(consumption: Consumption){
        this.consumptions.push(consumption);
    }

    fromJson(jsonObject){
        let dailyExpense = new DailyExpense();
        dailyExpense.setDate(new Date(jsonObject["datetime"]));
        let consumptionsArray = jsonObject["consumptions"];
        if(consumptionsArray){
            consumptionsArray.forEach((element) => {
                let consumption = new Consumption(element["amount"], element["desc"]);
                dailyExpense.addConsumption(consumption);
            });
        }
        return dailyExpense;
    }
}