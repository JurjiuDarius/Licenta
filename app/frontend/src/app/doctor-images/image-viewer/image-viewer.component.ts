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
    this.imageService.getImagesForUser(patientId).subscribe((response) => {
      this.images = response;
      this.images.map((image) => {
        image.image = 'data:image/png;base64,' + image.image;
      });
    });
  }

  public deleteImage(id: number): void {
    this.imageService.deleteImage(id).subscribe({
      next: (response) => {
        this.getImagesForPatient(Number(this.selectedPatientId));
        this.snackbar.open('Image deleted successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.snackbar.open('Error deleting image!', 'Close');
      },
    });
  }
  public editImage(id: number): void {}
}
