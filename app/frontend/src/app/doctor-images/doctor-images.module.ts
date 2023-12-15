import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesModule } from '../images/images.module';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MatSelectModule } from '@angular/material/select';
import { DoctorImagesRoutingModule } from './doctor-images-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageProcessingComponent } from './image-processing/image-processing.component';
import { MatButtonModule } from '@angular/material/button';
import { DiagnosticDialogComponent } from './diagnostic-dialog/diagnostic-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageViewerComponent,
    ImageProcessingComponent,
    DiagnosticDialogComponent,
  ],
  imports: [
    CommonModule,
    DoctorImagesRoutingModule,
    ImagesModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class DoctorImagesModule {}
