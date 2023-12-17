import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddPatientDialogComponent } from 'src/app/patients/add-patient-dialog/add-patient-dialog.component';

@Component({
  selector: 'app-diagnostic-dialog',
  templateUrl: './diagnostic-dialog.component.html',
  styleUrls: ['./diagnostic-dialog.component.sass'],
})
export class DiagnosticDialogComponent {
  @Input() public id: string = '';
  @Input() public text: string = '';
  @Input() readonly: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddPatientDialogComponent>
  ) {
    this.id = data.id;
    this.text = data.text;
    this.readonly = data.readonly;
  }

  fetchTextFromBackend() {
    this.text = 'Text fetched from the backend';
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close({ text: this.text, id: this.id });
  }
}
