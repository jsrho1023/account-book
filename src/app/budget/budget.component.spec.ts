import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetComponent } from './budget.component';
import { DailyExpense } from '../domain/dailyExpense';
import { Consumption } from '../domain/consumption';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetComponent ],
      imports: [ MatInputModule, 
        MatTableModule, 
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have budget value', () => {
    const budgetComponent: HTMLElement = fixture.nativeElement;
    let titleElement = budgetComponent.querySelector(".budget-total");
    expect(titleElement.textContent.trim()).toContain("₩ 20000");
  })
});
