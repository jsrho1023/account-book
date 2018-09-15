import { Action, State, StateContext } from '@ngxs/store';
import { DailyExpense } from '../domain/dailyExpense';
import { AddConsumption } from './budget.actions';

@State<DailyExpense>({
    name: 'dailyExpense',
    defaults: {
        datetime: new Date(),
        consumptions: [],
    }
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
}