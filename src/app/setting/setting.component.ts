import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class SettingErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingForm = new FormGroup({
    income: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]),
    expense: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]),
    saving: new FormControl(10000, [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ])
  });

  dailyBudget: number = 10000;
  matcher = new SettingErrorStateMatcher();

  constructor(public Store: Store) { }

  ngOnInit() {
  }

  onSave() {
    this.settingForm.reset();
  }
}
