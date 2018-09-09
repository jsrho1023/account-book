import { Consumption } from "../domain/consumption";

export class AddConsumption {
    static readonly type = '[Budget Page] Add Consumption';
    constructor(public consumption: Consumption) {}
}