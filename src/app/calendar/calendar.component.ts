import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNumber } from 'util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('date') date: Date;

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
  selectedDay: number;
  today: number;

  constructor() { }

  ngOnInit() {
    this.today = new Date().getDate();
    this.selectedDay = this.date.getDate();
    this.month.setValue(this.date.getMonth());
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

    let firstDayOfWeek = dayOfWeek - diff;

    return firstDayOfWeek > 0 ? firstDayOfWeek : firstDayOfWeek + 7;
  }

  selectDay(day: number){    
    if(isNumber(day)){
      this.selectedDay = day;
    }    
  }
}