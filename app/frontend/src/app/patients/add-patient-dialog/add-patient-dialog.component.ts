import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.sass'],
})
export class AddPatientDialogComponent implements OnInit {
  public email: string | null = null;
  constructor(public dialogRef: MatDialogRef<AddPatientDialogComponent>) {}

  ngOnInit(): void {}

  public cancel(): void {
    this.dialogRef.close();
  }
  public confirm(): void {
    this.dialogRef.close(this.email);
  }
}
