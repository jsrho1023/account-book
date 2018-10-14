import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Consumption } from '../domain/consumption';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { AddConsumption, ClearConsumptions } from './budget.actions';
import { ErrorStateMatcher } from '@angular/material/core';
import { DailyExpense } from '../domain/dailyExpense';

/** Error when invalid control is dirty, touched, or submitted. */
export class ConsumptionErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched || (form && form.touched)));
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

    canClear: boolean = false;

    consumptionForm = new FormGroup({
        amount: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\d+$/)
        ]),
        desc: new FormControl('')
    });

    matcher = new ConsumptionErrorStateMatcher();

    @Select(state => state.dailyExpense) dailyExpense$: Observable<DailyExpense>;

    constructor(public store: Store) { }

    ngOnInit() {
        this.balance = this.budget;
        this.date = new FormControl(new Date());

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
    }

    checkConsumptions(dailyExpense: DailyExpense) {
        if (dailyExpense.consumptions.length == 0) {
            this.canClear = false;
        } else {
            this.canClear = true;
        }
    }

    addConsumption(consumption: Consumption) {
        this.store.dispatch(new AddConsumption(consumption));
    }

    onAdd() {
        let amount: number = Number(this.consumptionForm.controls.amount.value);
        let desc: string = this.consumptionForm.controls.desc.value;
        this.addConsumption(new Consumption(amount, desc));
        this.consumptionForm.reset();
        this.consumptionForm.setErrors(null);
    }

    onClear() {
        this.store.dispatch(new ClearConsumptions());
        this.canClear = false;
    }

    onSave() {
        // send data to server
    }
}