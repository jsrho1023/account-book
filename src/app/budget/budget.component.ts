import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 1000;

    ngOnInit(){
        
    }

    onAddIncome(){
        this.budget += this.budget;
    }
}