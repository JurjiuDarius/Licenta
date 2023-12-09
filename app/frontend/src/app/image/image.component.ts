import { Component, Input, OnChanges } from '@angular/core';
import { Image } from '../models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
})
export class ImageComponent implements OnChanges {
  @Input() images: Image[] = [];
  constructor() {
    console.log('Display component', this.images);
  }
  public ngOnChanges() {
    console.log('Display component changes', this.images);
    this.images;
  }

  downloadImage(data: string, name: string) {
    const a = document.createElement('a');
    a.href = data;
    a.download = name;
    a.click();
  }
}
