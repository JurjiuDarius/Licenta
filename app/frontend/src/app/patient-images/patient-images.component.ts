import { Component, Input } from '@angular/core';
import { ImageService } from '../images/service/image.service';
import { Image } from '../models/image';
import { MatDialog } from '@angular/material/dialog';
import { DiagnosticDialogComponent } from '../doctor-images/diagnostic-dialog/diagnostic-dialog.component';
import { DiagnosticService } from '../doctor-images/service/diagnostic.service';

@Component({
  selector: 'app-patient-images',
  templateUrl: './patient-images.component.html',
  styleUrls: ['./patient-images.component.sass'],
})
export class PatientImagesComponent {
  public images: Image[] | null = null;
  @Input() patientId: string | null = null;
  constructor(
    private imageService: ImageService,
    private diagnosticService: DiagnosticService,
    private matDialog: MatDialog,
  ) {
    if (this.patientId == null) {
      this.patientId = localStorage.getItem('currentUserId');
    }
    this.fetchImages();
  }
  public openDiagnosticDialog(imageId: string): void {
    this.diagnosticService
      .getDiagnosticForImage(imageId)
      .subscribe((response) => {
        this.matDialog.open(DiagnosticDialogComponent, {
          width: '500px',
          height: '500px',
          data: { text: response.text, readonly: true },
        });
      });
  }
  private fetchImages(): void {
    if (this.patientId == null) {
      return;
    }
    this.imageService
      .getOriginalImagesForPatient(this.patientId)
      .subscribe((response) => {
        this.images = response;
        this.images?.map((image) => {
          image.image = 'data:image/png;base64,' + image.image;
        });
      });
  }
}
