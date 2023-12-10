import { Component } from '@angular/core';
import { UserService } from 'src/app/auth/service/user.service';
import { ImageService } from 'src/app/images/service/image.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.sass'],
})
export class ImageViewerComponent {
  public patients: User[] = [];
  public selectedPatientId: string = '';

  constructor(
    private imageService: ImageService,
    private userService: UserService
  ) {
    this.getPatients();
  }

  private getPatients(): void {
    const doctorId = Number(localStorage.getItem('currentUserId'));
    this.userService.getPatientsForDoctor(doctorId).subscribe((patients) => {
      this.patients = patients;
    });
  }

  private getImagesForPatient(patientId: number): void {
    this.imageService.getImagesForUser(patientId).subscribe((images) => {
      console.log(images);
    });
  }
}
