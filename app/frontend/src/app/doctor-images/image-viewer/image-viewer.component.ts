import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/auth/service/user.service';
import { ImageService } from 'src/app/images/service/image.service';
import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.sass'],
})
export class ImageViewerComponent {
  public images: Image[] = [];
  public patients: User[] = [];
  public selectedPatientId: string = '';
  public originalImage: Image | null = null;
  public processedImage: Image | null = null;

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {
    this.getPatients();
  }

  private getPatients(): void {
    const doctorId = Number(localStorage.getItem('currentUserId'));
    this.userService.getPatientsForDoctor(doctorId).subscribe((patients) => {
      this.patients = patients;
    });
  }

  public getImagesForPatient(patientId: number): void {
    this.imageService
      .getOriginalImagesForPatient(patientId)
      .subscribe((response) => {
        this.images = response;
        this.images.map((image) => {
          image.image = 'data:image/png;base64,' + image.image;
        });
      });
  }

  public deleteImage(id: number): void {
    this.imageService.deleteImage(id).subscribe({
      next: (response) => {
        this.imageService.getAllImagesForUser(Number(this.selectedPatientId));
        this.snackbar.open('Image deleted successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.snackbar.open('Error deleting image!', 'Close');
      },
    });
  }
  public openImage(id: number): void {
    const image = this.images.find((image) => image.id === id);
    if (image) {
      this.originalImage = image;
    }
  }
  public startProcessing(processingType: string): void {
    if (!this.originalImage) {
      return;
    }
    this.imageService
      .processImage(this.originalImage?.id, processingType)
      .subscribe({
        next: (response) => {
          this.processedImage = response;
          if (!this.processedImage) {
            return;
          }
          this.processedImage.image =
            'data:image/png;base64,' + this.processedImage.image;
        },
        error: (error) => {
          this.snackbar.open('Error processing image!', 'Close');
        },
      });
  }
}
