import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
})
export class ImageComponent {
  @Input() images: Image[] = [];
  @Output() deleteImageEmitter = new EventEmitter<number>();

  downloadImage(data: string, name: string) {
    const a = document.createElement('a');
    a.href = data;
    a.download = name;
    a.click();
  }
  deleteImage(id: number) {
    this.deleteImageEmitter.emit(id);
  }
}