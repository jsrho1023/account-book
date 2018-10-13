import { Action, State, StateContext } from '@ngxs/store';
import { DailyExpense } from '../domain/dailyExpense';
import { Consumption } from '../domain/consumption';
import { AddConsumption, ClearConsumptions } from './budget.actions';

const dailyExpenseDefault: DailyExpense = {
    datetime: new Date(),
    consumptions: []
}

@State<DailyExpense>({
    name: 'dailyExpense',
    defaults: dailyExpenseDefault
})
export class DailyExpenseState {
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
}