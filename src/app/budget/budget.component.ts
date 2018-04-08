import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Consumption } from '../domain/consumption'

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 20000;
    displayedColumns = ['amount','desc'];
    
    consumptions = [
        new Consumption(12000, "food"),
        new Consumption(10000, "beverage"),
        new Consumption(5000, "dissert")];

    dataSource = new MatTableDataSource(this.consumptions);
    remain: number;

    ngOnInit(){        
        this.remain = this.budget;
        this.consumptions.forEach(element => {
            this.remain -= element.amount;
        });
    }

    onAdd(){        

    }
}