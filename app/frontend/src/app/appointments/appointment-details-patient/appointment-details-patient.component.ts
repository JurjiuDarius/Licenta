import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from 'src/app/models/appointment';
import { UserService } from 'src/app/auth/service/user.service';

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
    private userService: UserService
  ) {
    this.getAppointmentById();
    this.getDoctorName();
  }

  private getAppointmentById(): void {
    let id_ = localStorage.getItem('currentAppointmentId');
    let id = Number(id_);

    this.appointmentsService.getAppointmentById(id).subscribe((response) => {
      this.appointment = response;
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
