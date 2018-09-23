import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Consumption } from '../domain/consumption';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { AddConsumption } from './budget.actions';
import { ErrorStateMatcher } from '@angular/material/core';
import { DailyExpense } from '../domain/dailyExpense';

/** Error when invalid control is dirty, touched, or submitted. */
export class ConsumptionErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
    budget: number = 10000;
    displayedColumns = ['amount', 'desc'];
    date: FormControl;

    dataSource: MatTableDataSource<Consumption>;
    balance: number;

    consumptionForm = new FormGroup({
        amount: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\d+$/)
        ]),
        desc: new FormControl('')
    });
    
    matcher = new ConsumptionErrorStateMatcher();

    @Select(state => state.dailyExpense) dailyExpense$: Observable<DailyExpense>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.balance = this.budget;
        this.date = new FormControl(new Date());

        this.dailyExpense$.subscribe((dailyExpense) => {
            this.dataSource = new MatTableDataSource(dailyExpense.consumptions);
            let totalExpense: number = 0;
            dailyExpense.consumptions.forEach(consumption => {
                totalExpense = totalExpense + consumption.amount
            });

            this.balance = this.budget - totalExpense;
        })
    }

    addConsumption(consumption: Consumption) {
        this.store
            .dispatch(new AddConsumption(consumption));;
    }

    onSubmit() {
        let amount: number = Number(this.consumptionForm.controls.amount.value)
        let desc: string = this.consumptionForm.controls.desc.value
        this.addConsumption(new Consumption(amount, desc));
    }
}