import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass'],
})
export class ConfirmationDialogComponent {
  public message: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
    this.message = data.message;
  }

  ngOnInit(): void {}

  public cancel(): void {
    this.dialogRef.close(false);
  }
  public confirm(): void {
    this.dialogRef.close(true);
  }
}
