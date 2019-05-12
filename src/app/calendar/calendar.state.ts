import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store';
import { GetMonthlyExpense } from './calendar.actions';
import { MonthlyExpense } from '../domain/monthlyExpense';
import { environment } from '../../environments/environment';

@State<MonthlyExpense>({
  name: 'monthlyExpense',
  defaults: { expense: {} }
})
export class MonthlyExpenseState {

  constructor(private http:HttpClient) { }

  @Action(GetMonthlyExpense)
  getMonthlyConsumption(context: StateContext<MonthlyExpense>, action: GetMonthlyExpense) {
    const state = context.getState();
    this.http.get<MonthlyExpense>(environment.apiUrl + ':' + environment.apiPort + '/api/expense/month/' + action.firstDate)
        .subscribe(expense => {
          context.setState({
            ...state,
            expense: expense
          });
        });
  }
}