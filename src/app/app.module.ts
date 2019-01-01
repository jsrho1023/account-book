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

import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin'
import { DailyExpenseState } from './budget/budget.state';
import { CalendarComponent } from './calendar/calendar.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeKR from '@angular/common/locales/ko';
import { ConsumptionComponent } from './consumption/consumption.component';

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
    ConsumptionComponent
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
      DailyExpenseState
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
