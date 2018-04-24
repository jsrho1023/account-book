import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DailyExpense } from '../domain/dailyExpense';
import { Consumption } from '../domain/consumption';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 20000;
    displayedColumns = ['amount','desc'];
    date: FormControl;
    
    dailyExpense : DailyExpense;

    dataSource : MatTableDataSource<Consumption>; 
    remain: number;

    ngOnInit(){
        this.remain = this.budget;        
        this.date = new FormControl(new Date());
        this.dailyExpense = new DailyExpense(new Date());
        this.dailyExpense.addConsumption(new Consumption(12000, "food"))
        this.dailyExpense.addConsumption(new Consumption(10000, "beverage"))
        this.dailyExpense.addConsumption(new Consumption(5000, "dissert"))
        this.dataSource = new MatTableDataSource(this.dailyExpense.consumptions);
        this.dailyExpense.consumptions.forEach(element => {
            this.remain -= element.amount;
        });
    }

    onAdd(){
        
    }
}