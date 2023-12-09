import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from 'src/app/models/appointment';
import { UserService } from 'src/app/auth/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/utils/http.service';
import { ImageService } from 'src/app/images/service/image.service';

@Component({
  selector: 'app-appointment-details-patient',
  templateUrl: './appointment-details-patient.component.html',
  styleUrls: ['./appointment-details-patient.component.sass'],
})
export class AppointmentDetailsPatientComponent {
  public appointment: Appointment | null = null;
  public doctorName: string | null = null;

  constructor(
    private appointmentsService: AppointmentsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.getAppointmentById();
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
