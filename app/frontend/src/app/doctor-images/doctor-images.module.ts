import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesModule } from '../images/images.module';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MatSelectModule } from '@angular/material/select';
import { DoctorImagesRoutingModule } from './doctor-images-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ImageViewerComponent],
  imports: [
    CommonModule,
    DoctorImagesRoutingModule,
    ImagesModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class DoctorImagesModule {}
