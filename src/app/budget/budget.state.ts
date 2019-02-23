import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store';
import { DailyExpense } from '../domain/dailyExpense';
import {
    AddConsumption,
    GetExpense,
    ClearConsumptions,
    SaveExpense,
    SetDate
} from './budget.actions';
import { environment } from '../../environments/environment'

const dailyExpenseDefault: DailyExpense = {
    datetime: '',
    consumptions: []
}

@State<DailyExpense>({
    name: 'dailyExpense',
    defaults: dailyExpenseDefault
})
export class DailyExpenseState {

    constructor(private http: HttpClient) { }

    @Action(AddConsumption)
    addConsumption(context: StateContext<DailyExpense>, action: AddConsumption) {
        const state = context.getState();
        context.setState({
            ...state,
            consumptions: [
                ...state.consumptions,
                action.consumption,
            ],
        });
    }

    @Action(ClearConsumptions)
    ClearConsumptions(context: StateContext<DailyExpense>) {
        const state = context.getState();
        context.setState(dailyExpenseDefault);
    }

    @Action(GetExpense)
    GetExpense(context: StateContext<DailyExpense>) {
        const state = context.getState();
        const date = state.datetime;
        this.http.get<DailyExpense>(environment.apiUrl + ':' + environment.apiPort + '/api/expense/day/' + date)
            .subscribe(expense => {
                context.setState({
                    datetime: expense.datetime,
                    consumptions: expense.consumptions
                })
            });
    }

    @Action(SaveExpense)
    SaveExpense(context: StateContext<DailyExpense>) {
        let state = context.getState();
        const date = state.datetime;
        this.http.post<DailyExpense>(environment.apiUrl + ':' + environment.apiPort + '/api/expense/day/' + date, context.getState())
            .subscribe(expense => {
                console.log(expense);
            });
    }

    @Action(SetDate)
    SetDate(context: StateContext<DailyExpense>, action: SetDate) {
        let state = context.getState();
        const timezoneOffset = action.date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(action.date.getTime() - timezoneOffset)).toISOString().slice(0, -1);
        state.datetime = localISOTime.slice(0,10);
    }
}