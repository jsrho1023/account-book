import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: [ './budget.component.css' ]
})
export class BudgetComponent implements OnInit{
    budget: number = 0;
    btnText: string;

    ngOnInit(){
        let btnText = "Add Income";
        let secondTick = Observable.timer(1000,1000);
        secondTick.subscribe((tick)=>{ this.budget += 1000; });
    }
}