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

  fdescribe('Render', () => {
    describe('when loaded', () => {
      it('then show calendar including today', ()=>{
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const month: HTMLSelectElement = calendarTemplate.querySelector('.select-month');
        expect(month.selectedIndex).toBe(component.date.getMonth());
      })

      it('then show today date as active', ()=>{
        const calendarTemplate : HTMLElement = fixture.nativeElement;
        const today: HTMLSelectElement = calendarTemplate.querySelector('.day.active');
        expect(today.textContent).toBe(component.date.getDate().toString());
      })
    })
  })

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