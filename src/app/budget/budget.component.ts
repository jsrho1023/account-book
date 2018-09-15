import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Consumption } from '../domain/consumption';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { AddConsumption } from './budget.actions';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 10000;
    displayedColumns = ['amount','desc'];
    date: FormControl;
    
    dataSource : MatTableDataSource<Consumption>; 
    balance: number;

    @Select(state => state.dailyExpense) dailyExpense$: Observable<any>;

    constructor(private store: Store){ }

    ngOnInit(){
        this.balance = this.budget;
        this.date = new FormControl(new Date());
        
        this.dailyExpense$.subscribe((dailyExpense)=>{
            this.dataSource = new MatTableDataSource(dailyExpense.consumptions);
            let totalExpense: number = 0;
            dailyExpense.consumptions.forEach(consumption => {
                totalExpense = totalExpense + parseInt(consumption.amount);
            });

            this.balance = this.budget - totalExpense;
        })
    }

    addConsumption(consumption: Consumption){
        this.store
            .dispatch(new AddConsumption(consumption));;
    }

    onSubmit(formData){
        let amount = formData.controls.amount.value
        let desc = formData.controls.desc.value
        this.addConsumption(new Consumption(amount, desc));
    }
}