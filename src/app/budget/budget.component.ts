import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DailyExpense } from '../domain/dailyExpense';
import { Consumption } from '../domain/consumption';
import { DailyExpenseService } from '../service/daily-expense.service';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { AddConsumption } from './budget.actions';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 20000;
    displayedColumns = ['amount','desc'];
    date: FormControl;
    
    dailyExpenseService: DailyExpenseService;
    dailyExpense : DailyExpense;

    dataSource : MatTableDataSource<Consumption>; 
    remain: number;

    @Select(state => state.dailyExpense) dailyExpense$: Observable<any>;

    constructor(dailyExpenseService : DailyExpenseService, private store: Store){
        this.dailyExpenseService = dailyExpenseService;
    }

    ngOnInit(){
        this.remain = this.budget;        
        this.date = new FormControl(new Date());
        this.dailyExpense = this.dailyExpenseService.getDailyExpense(new Date());
        this.dailyExpense$.subscribe((dailyExpense)=>{
            this.dataSource = new MatTableDataSource(dailyExpense.consumptions);
            dailyExpense.consumptions.forEach(element => {
                this.remain -= element.amount;
            });
        })
        
        this.addConsumption(new Consumption(1000, "stop wasting"));
        this.addConsumption(new Consumption(2000, "I knew you will"));
    }

    addConsumption(consumption: Consumption){
        this.store
            .dispatch(new AddConsumption(consumption));;
    }
}