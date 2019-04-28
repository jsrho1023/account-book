import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input('date') day: String;
  @Input('dailyBudget') budget: number;

  constructor() { }

  ngOnInit() {
  }

}
