import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
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

  describe('Method', () => {
    describe('when getFirstDayOfWeek', () => {
      it('with 16, 5(Friday) then return 4(Thursday)', () => {
        const firstDayOfWeek = fixture.componentInstance.getFirstDayOfWeek(16, 5);
        expect(firstDayOfWeek).toBe(4)
      })
    })
    
    describe('when setCalendarDate', () => {
      it('with 1 is Saturday, having 31 days then return data array with 6 weeks', () => {
        const calendarDate = fixture.componentInstance.setCalendarDate(6, 31);
        console.log(calendarDate);
        expect(calendarDate.length).toBe(6);    
      })
    })
  })
});