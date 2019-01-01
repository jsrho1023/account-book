import { Consumption } from "../domain/consumption";

export class AddConsumption {
    static readonly type = '[Budget Page] Add Consumption';
    constructor(public consumption: Consumption) {}
}

export class ClearConsumptions {
    static readonly type = '[Budget Page] Clear All Consumptions';
}

export class SaveExpense {
    static readonly type = '[Budget Page] Save Expense to Backend'
}