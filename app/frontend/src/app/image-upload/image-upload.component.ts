import { Component, OnInit } from '@angular/core';
import { ImageService } from './service/image.service';
import { Image } from '../models/image';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.sass'],
})
export class ImageUploadComponent implements OnInit {
  images: Image[] = [];
  public imagesLoaded: boolean = false;
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImages();
  }
  public uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file) {
        const currentUserId = Number(localStorage.getItem('currentUserId'));
        this.imageService
          .uploadImage(file, currentUserId)
          .subscribe((response) => {
            this.getImages();
          });
      }
    }
  }
  private getImages() {
    const currentUserId = Number(localStorage.getItem('currentUserId'));
    this.imageService.getImagesForUser(currentUserId).subscribe((response) => {
      this.images = response;
      this.images.map((image) => {
        image.image = 'data:image/png;base64,' + image.image;
      });
      console.log(this.images, this.imagesLoaded);
      this.imagesLoaded = true;
    });
  }
}
