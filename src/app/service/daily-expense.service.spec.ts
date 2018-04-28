import { TestBed, inject } from '@angular/core/testing';

import { DailyExpenseService } from './daily-expense.service';
import { DailyExpense } from '../domain/dailyExpense';

describe('DailyExpenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyExpenseService]
    });
  });

  it('should be created', inject([DailyExpenseService], (service: DailyExpenseService) => {
    expect(service).toBeTruthy();
  }));

  it('should return daily expense object', inject([DailyExpenseService], (service:DailyExpenseService) => {
    let result = service.getDailyExpense(new Date(2018, 4, 12));
    expect(typeof result).toEqual(typeof new DailyExpense());
  }));
});