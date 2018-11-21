import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(CalendarComponent);    
    component = fixture.componentInstance;
    component.date = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Event', ()=>{
    describe('when click day', ()=>{
      it('with "" then call selectDay method with empty string', ()=>{
        spyOn(component, 'selectDay');
        const calendarTemplate : HTMLElement = fixture.nativeElement;        
        const element : HTMLButtonElement = calendarTemplate.querySelectorAll('.day').item(3) as HTMLButtonElement;
        element.click();
        expect(component.selectDay).toHaveBeenCalledWith('');
      })      

      it('with valid number then call selectDay method with clicked number', ()=>{
        spyOn(component, 'selectDay');
        const calendarTemplate : HTMLElement = fixture.nativeElement;        
        const element : HTMLButtonElement = calendarTemplate.querySelectorAll('.day').item(5) as HTMLButtonElement;
        element.click();
        expect(component.selectDay).toHaveBeenCalledWith(2);
      })      
    })
    describe('when change month', ()=>{
      // ToDo
    })
  })

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
        const selectedDay: HTMLSelectElement = calendarTemplate.querySelector('.day.active');
        expect(selectedDay.textContent).toBe('5');
      })

      it('then show today date as today', ()=>{
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const today: HTMLSelectElement = calendarTemplate.querySelector('.day.today');
        expect(today.textContent).toBe(component.date.getDate().toString());
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
      it('with 4 then set selectedDay as 4', ()=>{
        const calendarComponent : CalendarComponent = fixture.componentInstance;
        calendarComponent.selectDay(4);
        expect(calendarComponent.selectedDay).toBe(4);
      })

      it('with emptyString then do nothing', ()=>{
        const calendarComponent : CalendarComponent = fixture.componentInstance;
        calendarComponent.selectedDay = 5
        calendarComponent.selectDay('');
        expect(calendarComponent.selectedDay).toBe(5);
      })
    })

    describe('when call setSelectedDate', () =>{
      // ToDo
    })

    describe('when call isToday', () =>{
      // ToDo
    })

    describe('when call isSelectedDate', () =>{
      // ToDo
    })
  })
});