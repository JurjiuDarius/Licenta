import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../models/image';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
})
export class ImageComponent {
  @Input() images: Image[] = [];
  @Input() requiresOpenButton: boolean = false;
  @Output() deleteImageEmitter = new EventEmitter<number>();
  @Output() openImageEmitter = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  downloadImage(data: string, name: string) {
    const a = document.createElement('a');
    a.href = data;
    a.download = name;
    a.click();
  }
  deleteImage(id: number) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: { message: 'Are you sure you want to delete this image?' },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result == true) {
          this.deleteImageEmitter.emit(id);
        }
      });
  }
  public editEvent(id: number) {
    this.openImageEmitter.emit(id);
  }
}
