import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input('date') date: Date;

  weeks = [];
  selectedDay: number;

  constructor() { }

  ngOnInit() {
    this.selectedDay = this.date.getDate();
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
}