import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image.service';
import { Image } from '../../models/image';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass'],
})
export class ImageUploadComponent implements OnInit {
  images: Image[] = [];
  public imagesLoaded: boolean = false;
  constructor(
    private imageService: ImageService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getImages();
  }
  public uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file) {
        const currentUserId = Number(localStorage.getItem('currentUserId'));
        this.imageService.uploadImage(file, currentUserId).subscribe({
          next: (response) => {
            this.getImages();
            this.snackbar.open('Image uploaded successfully!', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackbar.open('Error uploading image!', 'Close');
          },
        });
      }
    }
  }
  private getImages() {
    const currentUserId = Number(localStorage.getItem('currentUserId'));
    if (!currentUserId) {
      return;
    }
    this.imageService
      .getOriginalImagesForPatient(currentUserId)
      .subscribe((response) => {
        this.images = response;
        this.images.map((image) => {
          image.image = 'data:image/png;base64,' + image.image;
        });
        this.imagesLoaded = true;
      });
  }

  public deleteImage(id: number) {
    this.imageService.deleteImage(id).subscribe((response) => {
      this.snackbar.open('Image deleted successfully!', 'Close', {
        duration: 3000,
      });
      this.getImages();
    });
  }
}
