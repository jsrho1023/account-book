import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNumber } from 'util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('date') date: Date;
  @Output('change') change: EventEmitter<Date> = new EventEmitter<Date>();

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
  month: FormControl = new FormControl();
  selectedMonth: number;
  selectedDay: number;
  todayDate: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.setSelectedDate();
    this.month.setValue(this.selectedMonth);
    
    const dayOfWeek = this.date.getDay();
    const firstDayOfWeek = this.getFirstDayOfWeek(this.selectedDay, dayOfWeek);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    this.weeks = this.setCalendarDate(firstDayOfWeek, lastDay);
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
            days.push('');
          } else {
            days.push(currentDay++);
          }
        }
        else {
          if (currentDay <= lastDay) {
            days.push(currentDay++);
          } else {
            days.push('');
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

  selectMonth(month: {name: string, value: number}){
    this.date.setMonth(month.value);
    const dayOfWeek = this.date.getDay();
    const firstDayOfWeek = this.getFirstDayOfWeek(this.selectedDay, dayOfWeek);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    this.weeks = this.setCalendarDate(firstDayOfWeek, lastDay);
  }

  selectDay(day){    
    if(isNumber(day)){
      this.selectedMonth = this.month.value;
      this.selectedDay = day;
    }    
  }

  setSelectedDate(){
    this.selectedMonth = this.date.getMonth();
    this.selectedDay = this.date.getDate();
  }
  
  isToday(day){
    return this.month.value === this.todayDate.getMonth() && this.todayDate.getDate() === day;
  }

  isSelectedDate(day){
    return this.month.value === this.selectedMonth && this.selectedDay === day;
  }
}