import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-image-processing',
  templateUrl: './image-processing.component.html',
  styleUrls: ['./image-processing.component.sass'],
})
export class ImageProcessingComponent {
  @Input() public originalImage: Image | null = null;
  @Input() public processedImage: Image | null = null;
  @Output() public startProcessingEmitter = new EventEmitter<string>();
  public selectedProcessingType: string = '';
  processingTypes = [
    { value: 'dentalSegmentation', viewValue: 'Dental Segmentation' },
    { value: 'mandibleSegmentation', viewValue: 'Mandible Segmentation' },
  ];

  public startProcessing() {
    this.startProcessingEmitter.emit(this.selectedProcessingType);
  }
}
