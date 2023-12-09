import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.sass'],
})
export class ImageViewerComponent {
  public patients: User[] = [];
  public selectedPatientId: string = '';
}
