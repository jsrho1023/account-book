import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BudgetComponent } from "./budget/budget.component";
import { HeaderComponent } from './header/header.component';
import { SettingComponent } from './setting/setting.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day/day.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { DailyExpenseState } from './budget/budget.state';
import { MonthlyExpenseState } from './calendar/calendar.state';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeKR from '@angular/common/locales/ko';

registerLocaleData(localeKR, 'ko');

const appRoutes : Routes = [
  { path: '', component: BudgetComponent },
  { path: 'config', component: SettingComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    HeaderComponent,
    SettingComponent,
    CalendarComponent,
    ConsumptionComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    NgxsModule.forRoot([
      DailyExpenseState,
      MonthlyExpenseState
    ]),
    RouterModule.forRoot(appRoutes),
    NgxsRouterPluginModule.forRoot()
  ],
  entryComponents: [
    ConsumptionComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ko' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
