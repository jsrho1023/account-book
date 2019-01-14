import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Consumption } from '../domain/consumption';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { AddConsumption, ClearConsumptions, GetExpense, SaveExpense, SetDate } from './budget.actions';
import { DailyExpense } from '../domain/dailyExpense';
import { ConsumptionComponent } from '../consumption/consumption.component';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
    budget: number = 10000;
    displayedColumns = ['amount', 'desc'];
    date: Date = new Date();

    dataSource: MatTableDataSource<Consumption>;
    balance: number;

    canClear: boolean = false;

    @ViewChild("save") saveButton: ElementRef;

    @Select(state => state.dailyExpense) dailyExpense$: Observable<DailyExpense>;

    constructor(public store: Store, public dialog: MatDialog) { }

    ngOnInit() {
        this.balance = this.budget;

        this.dailyExpense$
            .subscribe((dailyExpense) => {
                this.dataSource = new MatTableDataSource(dailyExpense.consumptions);
                let totalExpense: number = 0;

                this.checkConsumptions(dailyExpense);

                dailyExpense.consumptions.forEach(consumption => {
                    totalExpense = totalExpense + consumption.amount
                });

                this.balance = this.budget - totalExpense;
            })
            
        this.store.dispatch(new SetDate(this.date));

        this.getExpense();
    }

    checkConsumptions(dailyExpense: DailyExpense) {
        if (dailyExpense.consumptions.length == 0) {
            this.canClear = false;
        } else {
            this.canClear = true;
        }
    }

    onAdd() {
        const dialogRef = this.dialog.open(ConsumptionComponent, {
            width: '250px',
            data: { amount: 0, desc: "" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let amount: number = Number(result.amount);
                let desc: string = result.desc;
                this.addConsumption(new Consumption(amount, desc));
            }
        });
    }

    getExpense(){
        this.store.dispatch(new GetExpense());
    }

    addConsumption(consumption: Consumption) {
        this.store.dispatch(new AddConsumption(consumption));
    }

    onClear() {
        this.store.dispatch(new ClearConsumptions());
        this.canClear = false;
    }

    onDateChange(date) {
        console.log(date);
    }

    onSave() {
        this.store.dispatch(new SaveExpense());
    }
}