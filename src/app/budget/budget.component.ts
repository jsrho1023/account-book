import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 20000;
    displayedColumns = ['amount','desc'];
    
    consumptions = [{
        amount: 12000,
        desc: "food"
    },{
        amount: 10000,
        desc: "beverage"
    },{
        amount: 12000,
        desc: "dissert"
    }];
    dataSource = new MatTableDataSource(this.consumptions);
    remain: number;

    ngOnInit(){        
        this.remain = this.budget;
        this.consumptions.forEach(element => {
            this.remain -= element.amount;
        });            
    }

    onAddIncome(){

    }
}