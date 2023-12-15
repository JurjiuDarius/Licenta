import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/auth/service/user.service';
import { ImageService } from 'src/app/images/service/image.service';
import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';
import { DiagnosticDialogComponent } from '../diagnostic-dialog/diagnostic-dialog.component';
import { DiagnosticService } from '../service/diagnostic.service';

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
    private diagnosticService: DiagnosticService,
    private dialog: MatDialog,
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
      .getAllImagesForPatient(patientId)
      .subscribe((response) => {
        this.images = response;
        console.log(response);
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
  public openImage(id: number): void {
    const image = this.images.find((image) => image.id === id);
    if (image) {
      if (image.originalImageId != null) {
        console.log(image);
        const originalImage = this.images.find(
          (searchImage) => searchImage.id === image.originalImageId
        );

        if (originalImage) {
          this.originalImage = originalImage;
          this.processedImage = image;
        } else {
          this.snackbar.open(
            'Error getting the original image. You can still download the processed image',
            'Close'
          );
        }
      } else {
        this.originalImage = image;
      }
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
          this.getImagesForPatient(Number(this.selectedPatientId));
        },
        error: (error) => {
          this.snackbar.open('Error processing image!', 'Close');
        },
      });
  }
  public onDialogOpen() {
    if (!this.originalImage) {
      return;
    }
    this.diagnosticService
      .getDiagnosticForImage(this.originalImage?.id)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.openDialog(response);
        },
        error: (error) => {
          this.snackbar.open('Error getting diagnostic!', 'Close');
        },
      });
  }

  private openDialog(dialogContent: any) {
    this.dialog
      .open(DiagnosticDialogComponent, {
        width: '500px',
        height: '500px',
        data: {
          text: dialogContent.text,
          id: dialogContent.id,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        const diagnostic = {
          id: result.id,
          text: result.text,
          imageUploadId: this.originalImage?.id,
          doctorId: Number(localStorage.getItem('currentUserId')),
          dateCreated: new Date(),
        };
        if (!this.originalImage) {
          return;
        }
        this.diagnosticService.saveDiagnostic(diagnostic).subscribe({
          next: (response) => {
            this.snackbar.open('Diagnostic saved successfully!', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackbar.open('Error saving diagnostic!', 'Close');
          },
        });
      });
  }
}