import { Component } from '@angular/core';
import { ImageService } from './service/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass'],
})
export class ImageUploadComponent {
  files: File[] = [];
  constructor(private imageService: ImageService) {}

  public uploadFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const currentUserId = Number(localStorage.getItem('currentUserId'));
      this.imageService.uploadImage(file, currentUserId).subscribe();
    }
  }
  private getImages() {
    const currentUserId = Number(localStorage.getItem('currentUserId'));
    this.imageService.getImagesForUser(currentUserId);
  }
}
