import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export interface ConsumptionData {
  amount: string;
  desc: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class ConsumptionErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!(control && control.invalid && (control.dirty || control.touched || (form && form.touched)));
  }
}

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent {

  consumptionForm = new FormGroup({
    amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
    ]),
    desc: new FormControl('')
  });

  matcher = new ConsumptionErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<ConsumptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConsumptionData) { }
  
  onCancel(){
    this.dialogRef.close();
  }

  onSave(){
    const returnData = {
      amount: this.consumptionForm.controls.amount.value,
      desc: this.consumptionForm.controls.desc.value
    }
    this.dialogRef.close(returnData)
  }
}
