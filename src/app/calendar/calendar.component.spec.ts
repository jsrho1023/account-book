import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './calendar.component';
import { DayComponent } from './day/day.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent,DayComponent],
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(CalendarComponent);    
    component = fixture.componentInstance;
    component.date = new Date(2018,10,24);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    describe('when loaded', () => {
      it('then show calendar including today', ()=>{
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const month: HTMLSelectElement = calendarTemplate.querySelector('.select-month');
        expect(month.selectedIndex).toBe(component.date.getMonth());
      })

      it('then show selected date as active', ()=>{
        fixture.componentInstance.selectedDay = 5;
        fixture.detectChanges();
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const selectedDay: HTMLElement = calendarTemplate.querySelector('.day-component.active');
        const day: HTMLSpanElement = selectedDay.querySelector('span');
        expect(day.textContent).toBe('5');
      })

      it('then show today date as today', ()=>{
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const today: HTMLElement = calendarTemplate.querySelector('.day-component.today');
        if(component.todayDate.getMonth() ===  component.selectedMonth){
          expect(today.textContent).toBe(component.todayDate.getDate().toString());
        }else{
          expect(today).toBeNull();
        }
      })
    })
  })

  describe('Event', ()=>{
    describe('when click day', ()=>{
      it('with "" then call selectDay method with empty string', ()=>{
        spyOn(component, 'selectDay');
        const calendarTemplate : HTMLElement = fixture.nativeElement;        
        const element : HTMLButtonElement = calendarTemplate.querySelectorAll('.day-component').item(3) as HTMLButtonElement;
        element.click();
        expect(component.selectDay).toHaveBeenCalledWith('');
      })

      it('with valid number then call selectDay method with clicked number', ()=>{
        spyOn(component, 'selectDay');        
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const element: HTMLButtonElement = calendarTemplate.querySelectorAll('.day-component').item(5) as HTMLButtonElement;
        debugger
        element.click();
        expect(component.selectDay).toHaveBeenCalledWith(2);
      })      
    })
    describe('when change month', ()=>{
      it('with October then call selectMonth with {name: "October", value: 9}', ()=>{
        spyOn(component, 'selectMonth');
        const calendarTemplate: HTMLElement = fixture.nativeElement;
        const element: HTMLSelectElement = calendarTemplate.querySelector('.select-month') as HTMLSelectElement;
        element.selectedIndex = 9;
        element.dispatchEvent(new Event('change'))
        fixture.detectChanges();
        expect(component.selectMonth).toHaveBeenCalled();
      })
    })    
  })

  describe('Method', () => {
    describe('when call getFirstDayOfWeek', () => {
      it('with 16, 5(Friday) then return 4(Thursday)', () => {
        const firstDayOfWeek = fixture.componentInstance.getFirstDayOfWeek(16, 5);
        expect(firstDayOfWeek).toBe(4)
      })

      it('with 21, 6(Saturday) then return 0(Sunday)', () => {
        const firstDayOfWeek = fixture.componentInstance.getFirstDayOfWeek(21, 6);
        expect(firstDayOfWeek).toBe(0)
      })

      it('with 8, 6(Saturday) then return 6(Saturday)', () => {
        const firstDayOfWeek = fixture.componentInstance.getFirstDayOfWeek(8, 6);
        expect(firstDayOfWeek).toBe(6)
      })
    })
    
    describe('when call setCalendarDate', () => {
      it('with 1 is Saturday, having 31 days then return data array with 6 weeks, 42 days', () => {
        const calendarDate = fixture.componentInstance.setCalendarDate(6, 31);
        expect(calendarDate.length).toBe(6);
        expect(calendarDate.reduce((sum, date)=>{
          return sum + date.days.length;
        }, 0)).toBe(42);
      })

      it('with 1 is Sunday, having 30 days then return data array with 5 weeks, 35 days', () => {
        const calendarDate = fixture.componentInstance.setCalendarDate(0, 30);
        expect(calendarDate.length).toBe(5);
        expect(calendarDate.reduce((sum, date)=>{
          return sum + date.days.length;
        }, 0)).toBe(35);
      })
    })

    describe('when call selectDay', ()=>{
      it('with 4 then set selectedDay as 4, and emit dateChange event', ()=>{
        spyOn(component.dateChange, 'emit');
        component.selectDay(4);
        expect(component.selectedDay).toBe(4);
        expect(component.dateChange.emit).toHaveBeenCalledWith(new Date(2018,10,4));
      })

      it('with emptyString then do nothing', ()=>{
        component.selectedDay = 5
        component.selectDay('');
        expect(component.selectedDay).toBe(5);
      })
    })

    describe('when call selectMonth', ()=>{
      it('given october selected, then set month, redraw calendar', ()=>{
        spyOn(component, 'setCalendarDate');
        component.monthSelect.setValue(9);
        component.selectMonth();
        expect(component.setCalendarDate).toHaveBeenCalledWith(1, 31);
      })
    })

    describe('when call setSelectedDate', () =>{
      it('given @input date 11/24, then set selectedMonth, Day to @input date', ()=>{        
        expect(component.selectedMonth).toBe(10);
        expect(component.selectedDay).toBe(24);
      })
    })

    describe('when call isToday', () =>{
      it('given same day with today, then return true', ()=>{
        component.monthSelect.setValue(new Date().getMonth());
        expect(component.isToday(new Date().getDate())).toBeTruthy();
      })

      it('given other day with today, then return false', ()=>{
        component.monthSelect.setValue(new Date().getMonth());
        expect(component.isToday(new Date().getDate()-1)).toBeFalsy();
      })      
    })

    describe('when call isSelectedDate', () =>{
      it('given same day with selectedDay, then return true', ()=>{
        expect(component.isSelectedDate(24)).toBeTruthy();
      })     

      it('given other day with selectedDay, then return false', ()=>{
        expect(component.isSelectedDate(21)).toBeFalsy();
      })     
    })
  })
});