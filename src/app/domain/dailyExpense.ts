import { Consumption } from "./consumption";

export class DailyExpense{
    datetime: Date;
    consumptions: Array<Consumption>;

    constructor(datetime: Date){
        this.datetime = datetime;
        this.consumptions = new Array<Consumption>();
    }

    addConsumption(consumption: Consumption){
        this.consumptions.push(consumption);
    }
}