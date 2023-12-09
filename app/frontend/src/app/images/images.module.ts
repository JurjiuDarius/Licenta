import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [ImageUploadComponent, ImageComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ImageUploadComponent],
})
export class ImagesModule {}
