export class GetMonthlyExpense {
  static readonly type = '[Calendar Component] Get Monthly Expense from Backend';
  constructor(public firstDate: string) {}
}