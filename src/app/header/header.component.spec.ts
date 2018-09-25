import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatToolbarModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    describe('when component loaded', () => {
      it('should have title "Daily Account Log"', () => {
        const HeaderComponent: HTMLElement = fixture.nativeElement;
        const titleElement = HeaderComponent.querySelector(".application-title");
        expect(titleElement.textContent).toEqual("Daily Account Log");
      })

      it('should have icon', () => {
        const HeaderComponent: HTMLElement = fixture.nativeElement;
        const remainElement = HeaderComponent.querySelector("mat-icon");
        expect(remainElement).not.toBe(null);
      })
    })

  })
});
