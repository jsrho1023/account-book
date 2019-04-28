import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    component.day = '28';
    component.budget = 10000;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    describe('when loaded', () => {
      it('then show day 28', () => {
        const dayComponent: HTMLElement = fixture.nativeElement;
        const daySpan = dayComponent.querySelector('.date > span');
        expect(daySpan.innerHTML).toBe('28');
      })

      it('then show budget 10000', () => {
        const dayComponent: HTMLElement = fixture.nativeElement;
        const budgetSpan = dayComponent.querySelector('.budget > span');
        expect(budgetSpan.innerHTML).toBe('10000');
      })

      it('when day is empty then budget become hidden', () => {
        component.day = '';
        fixture.detectChanges();
        const dayComponent: HTMLElement = fixture.nativeElement;
        const budgetSpan = dayComponent.querySelector('.budget > span');
        expect(budgetSpan).toBeNull();
      })
    })
  })
});