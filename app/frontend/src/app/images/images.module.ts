import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageComponent } from './image/image.component';
import { ConfirmationDialogComponent } from '../utils/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ImageUploadComponent,
    ImageComponent,
    ConfirmationDialogComponent,
  ],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ImageUploadComponent, ImageComponent],
})
export class ImagesModule {}
