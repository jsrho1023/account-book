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
import { MatNativeDateModule } from '@angular/material';
import { DailyExpenseState } from './budget.state';
import { NgxsModule } from '@ngxs/store';
import { of, Observable } from 'rxjs';
import { DailyExpense } from '../domain/dailyExpense';
import { Consumption } from '../domain/consumption';
import { AddConsumption, ClearConsumptions } from './budget.actions';
import { CalendarComponent } from '../calendar/calendar.component';
import { registerLocaleData } from '@angular/common';
import localeKR from '@angular/common/locales/ko';

registerLocaleData(localeKR, 'ko');

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let testableDailyExpenseState: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetComponent, CalendarComponent],
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
        const budgetComponent: HTMLElement = fixture.nativeElement;
        const titleElement = budgetComponent.querySelector(".budget-total");
        expect(titleElement.textContent.trim()).toContain("10,000");
      })

      it('then have remain value 7000', () => {
        const budgetComponent: HTMLElement = fixture.nativeElement;
        const remainElement = budgetComponent.querySelector(".balance-amount");
        expect(remainElement.textContent.trim()).toContain("7,000")
      })
    })
  })

  describe('Life Cycle', () => {
    describe('when ngOnInit', () => {
      it('then subscribe dailyExpense state', () => {
        spyOn(fixture.componentInstance.dailyExpense$, 'subscribe');
        fixture.componentInstance.ngOnInit()
        expect(fixture.componentInstance.dailyExpense$.subscribe).toHaveBeenCalled()
      })

      it('then set canClear true', () => {
        expect(fixture.componentInstance.canClear).toBeTruthy()
      })
    })
  })

  describe('Method', () => {
    describe('when checkConsumptions', ()=>{
      it('then set canClear false if consumptions has no consumption', ()=>{
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        const dailyExpense: DailyExpense = {
          datetime: new Date(),
          consumptions: []
        }
        budgetComponent.checkConsumptions(dailyExpense);
        expect(budgetComponent.canClear).toBeFalsy();
      })

      it('then set canClear true if consumptions has any consumption', ()=>{
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        const dailyExpense: DailyExpense = {
          datetime: new Date(),
          consumptions: [
            new Consumption(1000, 'test')
          ]
        }
        budgetComponent.checkConsumptions(dailyExpense);
        expect(budgetComponent.canClear).toBeTruthy();
      })
    })

    describe('when addConsumption', () => {
      it('then dispatch AddConsumption action', () => {
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        spyOn(budgetComponent.store, 'dispatch');
        const consumption = new Consumption(2000, 'test');
        budgetComponent.addConsumption(consumption)
        expect(fixture.componentInstance.store.dispatch).toHaveBeenCalledWith(new AddConsumption(consumption));
      })
    })

    describe('when onAdd', () => {
      it('then call addConsumption with form values', () => {
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        budgetComponent.consumptionForm.controls.amount.setValue(2000);
        budgetComponent.consumptionForm.controls.desc.setValue('test');
        spyOn(fixture.componentInstance, 'addConsumption');
        fixture.componentInstance.onAdd();
        expect(fixture.componentInstance.addConsumption).toHaveBeenCalledWith(new Consumption(2000, 'test'));
      })

      it('then clear value of form controls', () => {
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        budgetComponent.consumptionForm.controls.amount.setValue(2000);
        budgetComponent.consumptionForm.controls.desc.setValue('test');
        fixture.componentInstance.onAdd();
        expect(budgetComponent.consumptionForm.controls.amount.value).toEqual(null)
        expect(budgetComponent.consumptionForm.controls.desc.value).toEqual(null)
        expect(budgetComponent.consumptionForm.controls.amount.errors).toEqual({required: true})
      })
    })

    describe('when onClear', ()=>{
      it('then clear dailyExpense$.consumptions',()=>{
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        spyOn(budgetComponent.store, 'dispatch');
        budgetComponent.onClear();
        expect(budgetComponent.store.dispatch).toHaveBeenCalledWith(new ClearConsumptions());
        expect(budgetComponent.canClear).toBeFalsy();
      })
    })
  })
});
