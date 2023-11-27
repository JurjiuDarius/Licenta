import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from 'src/app/models/appointment';
import { UserService } from 'src/app/auth/service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-details-patient',
  templateUrl: './appointment-details-patient.component.html',
  styleUrls: ['./appointment-details-patient.component.sass'],
})
export class AppointmentDetailsPatientComponent {
  public appointment: Appointment | null = null;
  public doctorName: string | null = null;
  public fileName: string | null = null;

  constructor(
    private appointmentsService: AppointmentsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.getAppointmentById();
  }

  public uploadFile(event: any) {
    const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("/api/thumbnail-upload", formData);

            upload$.subscribe();
  }

  private getAppointmentById(): void {
    let id_ = this.route.snapshot.paramMap.get('id');
    let id = Number(id_);

    this.appointmentsService.getAppointmentById(id).subscribe((response) => {
      this.appointment = response;
      this.getDoctorName();
    });
  }

  private getDoctorName(): void {
    let doctorId = this.appointment?.doctorId;
    if (doctorId) {
      this.userService.getUserName(doctorId).subscribe((response) => {
        this.doctorName = response;
      });
    }
  }
}
