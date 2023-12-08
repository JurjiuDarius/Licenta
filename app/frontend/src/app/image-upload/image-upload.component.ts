import { Component } from '@angular/core';
import { ImageService } from './service/image.service';
import { Image } from '../models/image-upload';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass'],
})
export class ImageUploadComponent {
  images: Image[] = [];
  constructor(private imageService: ImageService) {}

  public uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file) {
        const currentUserId = Number(localStorage.getItem('currentUserId'));
        this.imageService.uploadImage(file, currentUserId).subscribe(() => {
          console.log('Successful upload');
        });
      }
    }
  }
  private getImages() {
    const currentUserId = Number(localStorage.getItem('currentUserId'));
    this.imageService
      .getImagesForUser(currentUserId)
      .subscribe((response) => (this.images = response.images));
  }
}
