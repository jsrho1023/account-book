import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetComponent } from './budget.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { DailyExpenseState } from './budget.state';
import { NgxsModule } from '@ngxs/store';
import { of, Observable } from 'rxjs';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let testableDailyExpenseState: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      imports: [MatInputModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxsModule.forRoot([DailyExpenseState])]
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

  describe('Life Cycle', () => {
    describe('ngOnInit', () => {
      it('should have budget value 10000', () => {
        const budgetComponent: HTMLElement = fixture.nativeElement;
        const titleElement = budgetComponent.querySelector(".budget-total");
        expect(titleElement.textContent.trim()).toContain("10000");
      })

      it('should have remain value 7000', () => {
        const budgetComponent: HTMLElement = fixture.nativeElement;
        const remainElement = budgetComponent.querySelector(".remain-amount");
        expect(remainElement.textContent.trim()).toContain("7000")
      })
    })

  })
});
