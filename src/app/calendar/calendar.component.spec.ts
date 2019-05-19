import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './calendar.component';
import { DayComponent } from './day/day.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { MonthlyExpenseState } from './calendar.state';
import { GetMonthlyExpense } from './calendar.actions';
import { Observable, of } from 'rxjs';
import { MonthlyExpense } from '../domain/monthlyExpense';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let testableMonthlyExpenseState: Observable<MonthlyExpense>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent,DayComponent],
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxsModule.forRoot([
          MonthlyExpenseState
        ])]
      })
      .compileComponents();
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(CalendarComponent);    
    component = fixture.componentInstance;
    Object.defineProperty(component, 'monthlyExpense$', { writable: true });
    let monthlyExpenseState: MonthlyExpense = {
      "expense": {
        "2018-11-01": 1000,
        "2018-11-02": 0,
        "2018-11-03": 2000,
        "2018-11-04": 0,
        "2018-11-05": 0,
        "2018-11-06": 0,
        "2018-11-07": 5000,
        "2018-11-08": 0,
        "2018-11-09": 0,
        "2018-11-10": 0,
        "2018-11-11": 0,
        "2018-11-12": 0,
        "2018-11-13": 0,
        "2018-11-14": 0,
        "2018-11-15": 0,
        "2018-11-16": 12000,
        "2018-11-17": 0,
        "2018-11-18": 0,
        "2018-11-19": 0,
        "2018-11-20": 0,
        "2018-11-21": 0,
        "2018-11-22": 0,
        "2018-11-23": 0,
        "2018-11-24": 0,
        "2018-11-25": 0,
        "2018-11-26": 0,
        "2018-11-27": 0,
        "2018-11-28": 0,
        "2018-11-29": 0,
        "2018-11-30": 0,
        "2018-11-31": 0,
      }
    }

    testableMonthlyExpenseState = of(monthlyExpenseState);
    component.monthlyExpense$ = testableMonthlyExpenseState;
    component.date = new Date(2018,10,24);

    const mockStore = jasmine.createSpyObj('mockStore', ['dispatch']);
    component.store = mockStore;

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

  describe('Life Cycle', () => {
    describe('when ngOnInit', () => {
      it('then subscribe monthlyExpense state', () => {
        spyOn(component.monthlyExpense$, 'subscribe');
        component.ngOnInit();
        expect(component.monthlyExpense$.subscribe).toHaveBeenCalledTimes(1);
      })

      it('then call store.dispatch with GetMonthlyExpense action', () => {
        component.ngOnInit();
        expect(component.store.dispatch).toHaveBeenCalledWith(new GetMonthlyExpense('2018-11-1'));
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
    describe('when call setCalendarDateAndBudget', ()=>{
      it('given monthlyExpense return calendar array ', ()=>{
        component.dailyBudget = 0;
      })
    })    
    
    describe('when call selectMonth', ()=>{
      it('given october selected, then set month, call store.dispatch with GetMonthlyExpense action', ()=>{
        component.monthSelect.setValue(9);
        component.selectMonth();
        expect(component.store.dispatch).toHaveBeenCalledWith(new GetMonthlyExpense('2018-10-1'));
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