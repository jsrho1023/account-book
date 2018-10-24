import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgxsModule } from '@ngxs/store';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        NgxsModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    describe('when component loaded', () => {
      it('then have title "Daily Account Log"', () => {
        const HeaderComponent: HTMLElement = fixture.nativeElement;
        const titleElement = HeaderComponent.querySelector(".application-title");
        expect(titleElement.textContent).toEqual("Daily Account Log");
      })

      it('then have icons', () => {
        const HeaderComponent: HTMLElement = fixture.nativeElement;
        const iconElements = HeaderComponent.querySelectorAll("mat-icon");
        expect(iconElements.item(0).textContent).toEqual('account_balance');
        expect(iconElements.item(1).textContent).toEqual('settings');
      })
    })
  })

  describe('Event', () => {
    describe('when click account_balance icon', () => {
      it('then call moveTo method with /"', () => {
        const HeaderComponent = fixture.nativeElement;
        spyOn(component, 'moveTo');
        const iconElements = HeaderComponent.querySelectorAll("mat-icon");
        iconElements.item(0).click();
        expect(component.moveTo).toHaveBeenCalledWith('/')
      })
    })

    describe('when click title', () => {
      it('then call moveTo method with /', () => {
        spyOn(component, 'moveTo');
        const HeaderComponent = fixture.nativeElement;
        const titleElement = HeaderComponent.querySelector(".application-title");
        titleElement.click();
        expect(component.moveTo).toHaveBeenCalledWith('/')
      })
    })

    describe('when click setting icon', () => {
      it('then call moveTo method with /config"', () => {
        const HeaderComponent = fixture.nativeElement;
        spyOn(component, 'moveTo');
        const iconElements = HeaderComponent.querySelectorAll("mat-icon");
        iconElements.item(1).click();
        expect(component.moveTo).toHaveBeenCalledWith('/config')
      })
    })
  })
});
