import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetComponent } from './budget.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { DailyExpenseState } from './budget.state';
import { NgxsModule } from '@ngxs/store';
import { of, Observable } from 'rxjs';
import { DailyExpense } from '../domain/dailyExpense';
import { Consumption } from '../domain/consumption';
import { AddConsumption, ClearConsumptions, GetExpense, SaveExpense, SetDate } from './budget.actions';
import { CalendarComponent } from '../calendar/calendar.component';
import { ConsumptionComponent } from '../consumption/consumption.component';
import { DayComponent } from '../calendar/day/day.component';
import { registerLocaleData } from '@angular/common';
import localeKR from '@angular/common/locales/ko';
import { HttpClientModule } from '@angular/common/http';


registerLocaleData(localeKR, 'ko');

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let testableDailyExpenseState: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetComponent, CalendarComponent, DayComponent],
      imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        NgxsModule.forRoot([
          DailyExpenseState
        ])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'dailyExpense$', { writable: true });
    let dailyExpenseState = {
      "datetime": "2018-04-12T12:41:56.385Z",
      "consumptions": [
        {
          "amount": 1000,
          "desc": "stop wasting"
        },
        {
          "amount": 2000,
          "desc": "I know you did"
        }
      ]
    }

    testableDailyExpenseState = of(dailyExpenseState)
    component.dailyExpense$ = testableDailyExpenseState;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    describe('when loaded', () => {
      it('then have budget value 10000', () => {
        const budgetTemplate: HTMLElement = fixture.nativeElement;
        const titleElement = budgetTemplate.querySelector(".budget-total");
        expect(titleElement.textContent.trim()).toContain("10,000");
      })

      it('then have remain value 7000', () => {
        const budgetTemplate: HTMLElement = fixture.nativeElement;
        const remainElement = budgetTemplate.querySelector(".balance-amount");
        expect(remainElement.textContent.trim()).toContain("7,000")
      })
    })
  })

  describe('Life Cycle', () => {
    describe('when ngOnInit', () => {
      it('then subscribe dailyExpense state', () => {
        spyOn(component.dailyExpense$, 'subscribe');
        component.ngOnInit();
        expect(component.dailyExpense$.subscribe).toHaveBeenCalledTimes(1);
      })
      it('then set canClear true', () => {
        expect(component.canClear).toBeTruthy();
      })

      it('then call getExpense', () => {
        spyOn(component, 'getExpense');
        component.ngOnInit();
        expect(component.getExpense).toHaveBeenCalledTimes(1);
      })
    })
  })

  describe('Event', () => {
    describe('when add icon click', () => {
      it('then call onAdd', () => {
        const budgetTemplate: HTMLElement = fixture.nativeElement;
        const addIconButton: HTMLButtonElement = budgetTemplate.querySelector('.consumption-list-header > button');
        spyOn(component, 'onAdd');
        addIconButton.click();
        expect(component.onAdd).toHaveBeenCalledTimes(1);
      })
    })

    describe('when clear button click', () => {
      it('then call onClear', () => {
        const budgetTemplate: HTMLElement = fixture.nativeElement;
        const clearButton: HTMLButtonElement = budgetTemplate.querySelector('.action-button-box button:first-of-type');
        spyOn(component, 'onClear');
        clearButton.click();
        expect(component.onClear).toHaveBeenCalledTimes(1);
      })
    })

    describe('when save button click', () => {
      it('then call onSave', () => {
        const budgetTemplate: HTMLElement = fixture.nativeElement;
        component.canSave = true;
        fixture.detectChanges();
        const saveButton: HTMLButtonElement = budgetTemplate.querySelector('.action-button-box button:last-of-type');
        spyOn(component, 'onSave');
        saveButton.click();
        expect(component.onSave).toHaveBeenCalledTimes(1);
      })
    })
  })

  describe('Method', () => {
    describe('when checkConsumptions', () => {
      it('then set canClear false if consumptions has no consumption', () => {
        const dailyExpense: DailyExpense = {
          datetime: new Date().toISOString().slice(0,10),
          consumptions: []
        }
        debugger
        component.checkConsumptions(dailyExpense);
        expect(component.canClear).toBeFalsy();
      })

      it('then set canClear true if consumptions has any consumption', () => {
        const dailyExpense: DailyExpense = {
          datetime: new Date().toISOString().slice(0,10),
          consumptions: [
            new Consumption(1000, 'test')
          ]
        }
        component.checkConsumptions(dailyExpense);
        expect(component.canClear).toBeTruthy();
      })
    })

    describe('when onAdd', () => {
      it('then call dialog open method with ConsumptionComponent', () => {
        const budgetComponent: BudgetComponent = component;
        const afterClosedSpy = jasmine.createSpyObj('afterClosed', ['subscribe'])
        const dialogRefSpy = jasmine.createSpyObj('dialogRef', {
          'afterClosed': afterClosedSpy
        });
        spyOn(budgetComponent.dialog, 'open').and.returnValue(dialogRefSpy);

        component.onAdd();
        expect(budgetComponent.dialog.open).toHaveBeenCalledWith(ConsumptionComponent, {
          width: '250px',
          data: { amount: 0, desc: "" }
        });
      })

      it('then subcribe dialogRef afterClosed', () => {
        const budgetComponent: BudgetComponent = component;
        const afterClosedSpy = jasmine.createSpyObj('afterClosed', ['subscribe'])
        const dialogRefSpy = jasmine.createSpyObj('dialogRef', {
          'afterClosed': afterClosedSpy
        });
        spyOn(budgetComponent.dialog, 'open').and.returnValue(dialogRefSpy);

        component.onAdd();
        expect(afterClosedSpy.subscribe).toHaveBeenCalledWith(jasmine.any(Function))
      })
    })

    describe('when addConsumption', () => {
      it('then dispatch saveExpense action', () => {
        spyOn(component.store, 'dispatch');
        const consumption = new Consumption(2000, 'test');
        component.addConsumption(consumption)
        expect(component.store.dispatch).toHaveBeenCalledWith(new AddConsumption(consumption));
      })
    })

    describe('when getExpense', () => {
      it('then dispatch GetExpense action', () => {
        spyOn(component.store, 'dispatch');        
        component.getExpense()
        expect(component.store.dispatch).toHaveBeenCalledWith(new GetExpense());
      })
    })

    describe('when onClear', () => {
      it('then clear dailyExpense$.consumptions', () => {
        const budgetComponent: BudgetComponent = component;
        spyOn(budgetComponent.store, 'dispatch');
        budgetComponent.onClear();
        expect(budgetComponent.store.dispatch).toHaveBeenCalledWith(new ClearConsumptions());
        expect(budgetComponent.canClear).toBeFalsy();
      })
    })

    describe('when onDateChange', ()=>{
      it('then log date', ()=>{
        spyOn(component.store, 'dispatch');
        spyOn(component, 'getExpense');
        const date = new Date();
        component.onDateChange(date)
        expect(component.date).toEqual(date);
        expect(component.store.dispatch).toHaveBeenCalledWith(new SetDate(date));
        expect(component.getExpense).toHaveBeenCalled()
      })
    })

    describe('when onSave', ()=>{
      it('then dispatch SaveExpense action', ()=>{
        spyOn(component.store, 'dispatch');        
        component.onSave()
        expect(component.store.dispatch).toHaveBeenCalledWith(new SaveExpense());
      })
    })
  })
});
