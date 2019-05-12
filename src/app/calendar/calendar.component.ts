import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNumber } from 'util';
import { Store, Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { GetMonthlyExpense } from './calendar.actions';

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

  @Select(state => state.monthlyExpense) monthlyExpense$: Observable<{}>;

  constructor(public store: Store) { }

  ngOnInit() {
    this.setSelectedDate();
    this.monthSelect.setValue(this.selectedMonth);

    this.monthlyExpense$
        .subscribe((result) => {
          console.log(result);
        });

    const firstDay = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-1';    

    const dayOfWeek = this.date.getDay();
    const firstDayOfWeek = this.getFirstDayOfWeek(this.selectedDay, dayOfWeek);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    this.weeks = this.setCalendarDate(firstDayOfWeek, lastDay);
    this.store.dispatch(new GetMonthlyExpense(firstDay));
  }

  setCalendarDate(firstDayOfWeek: number, lastDay: number) {
    let calendarData = [];
    let currentDay = 1;
    let currentWeek = 0;

    while (currentDay <= lastDay) {
      let days = [];
      for (let i = 0; i < 7; i++) {
        if (currentWeek === 0) {
          if (i < firstDayOfWeek) {
            days.push({date:'', budget:0});
          } else {
            days.push({date:currentDay++, budget:0});
          }
        }
        else {
          if (currentDay <= lastDay) {
            days.push({date:currentDay++, budget:0});
          } else {
            days.push({date:'', budget:0});
          }
        }
      }
      calendarData.push({ days });
      currentWeek++;
    }

    return calendarData;
  }

  getFirstDayOfWeek(day: number, dayOfWeek: number): number {
    const diff = day % 7 - 1;
    let firstDayOfWeek = (dayOfWeek - diff) % 7;

    return firstDayOfWeek >= 0 ? firstDayOfWeek : firstDayOfWeek + 7;
  }

  selectMonth(){
    this.date.setMonth(this.monthSelect.value);
    const dayOfWeek = this.date.getDay();
    const firstDayOfWeek = this.getFirstDayOfWeek(this.selectedDay, dayOfWeek);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    this.weeks = this.setCalendarDate(firstDayOfWeek, lastDay);
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