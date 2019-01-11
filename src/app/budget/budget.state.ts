import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store';
import { DailyExpense } from '../domain/dailyExpense';
import { AddConsumption, ClearConsumptions, SaveExpense } from './budget.actions';
import { environment } from '../../environments/environment'

const dailyExpenseDefault: DailyExpense = {
    datetime: new Date(),
    consumptions: []
}

@State<DailyExpense>({
    name: 'dailyExpense',
    defaults: dailyExpenseDefault
})
export class DailyExpenseState {

    constructor(private http: HttpClient){}

    @Action(AddConsumption)
    addConsumption(context: StateContext<DailyExpense>, action:AddConsumption){
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
    ClearConsumptions(context: StateContext<DailyExpense>){
        const state = context.getState();
        context.setState(dailyExpenseDefault);
    }

    @Action(SaveExpense)
    SaveExpense(context: StateContext<DailyExpense>){
        const state = context.getState()
        const date = state.datetime.toISOString().slice(0,10)
        this.http.post<DailyExpense>(environment.apiUrl + ':' + environment.apiPort + '/api/expense/day/' + date, context.getState())
            .subscribe(expense => {
                console.log(expense);
            });
    }
}