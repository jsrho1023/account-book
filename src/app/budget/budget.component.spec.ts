import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetComponent } from './budget.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { DailyExpenseState } from './budget.state';
import { NgxsModule } from '@ngxs/store';
import { of, Observable } from 'rxjs';
import { Consumption } from '../domain/consumption';
import { AddConsumption } from './budget.actions';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let testableDailyExpenseState: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxsModule.forRoot([
          DailyExpenseState
        ])]
    })
      .compileComponents();
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    describe('when loaded', () => {
      it('should have budget value 10000', () => {
        const budgetComponent: HTMLElement = fixture.nativeElement;
        const titleElement = budgetComponent.querySelector(".budget-total");
        expect(titleElement.textContent.trim()).toContain("10,000");
      })

      it('should have remain value 7000', () => {
        const budgetComponent: HTMLElement = fixture.nativeElement;
        const remainElement = budgetComponent.querySelector(".balance-amount");
        expect(remainElement.textContent.trim()).toContain("7,000")
      })
    })
  })

  describe('Life Cycle', () => {
    describe('when ngOnInit', () => {
      it('should subscribe dailyExpense state', () => {
        spyOn(fixture.componentInstance.dailyExpense$, 'subscribe');
        fixture.componentInstance.ngOnInit()
        expect(fixture.componentInstance.dailyExpense$.subscribe).toHaveBeenCalled()
      })
    })
  })

  describe('Method', () => {
    describe('when addConsumption', () => {
      it('should dispatch AddConsumption action', () => {
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        spyOn(budgetComponent.store, 'dispatch');
        const consumption = new Consumption(2000, 'test');
        budgetComponent.addConsumption(consumption)
        expect(fixture.componentInstance.store.dispatch).toHaveBeenCalledWith(new AddConsumption(consumption));
      })
    })

    describe('when onSubmit', () => {
      it('should call addConsumption with form values', () => {
        const budgetComponent: BudgetComponent = fixture.componentInstance;
        budgetComponent.consumptionForm.controls.amount.setValue(2000);
        budgetComponent.consumptionForm.controls.desc.setValue('test');
        spyOn(fixture.componentInstance, 'addConsumption');
        fixture.componentInstance.onSubmit();
        expect(fixture.componentInstance.addConsumption).toHaveBeenCalledWith(new Consumption(2000, 'test'));
      })
    })
  })
});
