import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNumber } from 'util';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { GetMonthlyExpense } from './calendar.actions';
import { MonthlyExpense } from '../domain/monthlyExpense';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('date') date: Date;
  @Output('dateChange') dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  months = [
    {name: 'January', value: 0},
    {name: 'Febrary', value: 1},
    {name: 'March', value: 2},
    {name: 'April', value: 3},
    {name: 'May', value: 4},
    {name: 'June', value: 5},
    {name: 'July', value: 6},
    {name: 'August', value: 7},
    {name: 'September', value: 8},
    {name: 'October', value: 9},
    {name: 'November', value: 10},
    {name: 'December', value: 11}
  ];
  weeks = [];  
  monthSelect: FormControl = new FormControl();
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  todayDate: Date = new Date();
  dailyBudget: number = 10000;

  @Select(state => state.monthlyExpense) monthlyExpense$: Observable<MonthlyExpense>;

  constructor(public store: Store) { }

  ngOnInit() {
    this.setSelectedDate();
    this.monthSelect.setValue(this.selectedMonth);

    this.monthlyExpense$
        .subscribe((monthlyExpense) => {
          this.weeks = this.setCalendarDateAndBudget(monthlyExpense);
        });

    const firstDay = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-1';
    this.store.dispatch(new GetMonthlyExpense(firstDay));
  }

  setCalendarDateAndBudget(monthlyExpense: MonthlyExpense){
    let calendarData = [];
    let days = [];
    let budget = -this.dailyBudget;
    
    const dateArray = Object.keys(monthlyExpense.expense);
    const firstKey = dateArray[0];
    const firstDate = new Date(firstKey);
    const firstDayOfWeek = firstDate.getDay();

    for(let i=0; i<firstDayOfWeek; i++){
      days.push({date:'', budget:0});
    }

    for (const key in dateArray) {
      if(days.length == 7) {
        calendarData.push({days});
        days = [];
      }
      
      let date = new Date(dateArray[key]);
      budget = budget - monthlyExpense.expense[dateArray[key]] + this.dailyBudget;
      days.push({date: date.getDate(), budget: budget});
    }

    for(let i = days.length; i < 7; i++){
      days.push({date:'', budget:0});
    }
    calendarData.push({days});

    return calendarData;
  }

  selectMonth(){
    this.date.setMonth(this.monthSelect.value);
    const firstDay = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-1';
    this.store.dispatch(new GetMonthlyExpense(firstDay));
  }

  selectDay(day){    
    if(isNumber(day)){
      this.selectedMonth = this.monthSelect.value;
      this.selectedDay = day;
      this.dateChange.emit(new Date(this.selectedYear, this.selectedMonth, this.selectedDay));
    }
  }

  setSelectedDate(){
    this.selectedYear = this.date.getFullYear();
    this.selectedMonth = this.date.getMonth();
    this.selectedDay = this.date.getDate();
  }
  
  isToday(day){
    return this.monthSelect.value === this.todayDate.getMonth() && this.todayDate.getDate() === day;
  }

  isSelectedDate(day){
    return this.monthSelect.value === this.selectedMonth && this.selectedDay === day;
  }
}