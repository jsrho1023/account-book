import { Consumption } from "../domain/consumption";

export class SetDate {
    static readonly type = '[Budget Page] Set Datetime'
    constructor(public date: Date) {}
}

export class AddConsumption {
    static readonly type = '[Budget Page] Add Consumption';
    constructor(public consumption: Consumption) {}
}

export class ClearConsumptions {
    static readonly type = '[Budget Page] Clear All Consumptions';
}

export class GetExpense {
    static readonly type = '[Budget Page] Get Expense from Backend';
}

export class SaveExpense {
    static readonly type = '[Budget Page] Save Expense to Backend';
}