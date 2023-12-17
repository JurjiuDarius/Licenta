import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { UserService } from 'src/app/auth/service/user.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.sass'],
})
export class AppointmentsComponent {
  public currentRole: string | null = null;
  public currentUserId: number | null = null;
  public appointments: Appointment[] | null = [];

  constructor(
    private appointmentsService: AppointmentsService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.getLocalStorage();
    this.getAllAppointments();
    this.authService.getAuthChanges().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.getLocalStorage();
      }
    });
  }

  ngOnInit(): void {}

  public getAllAppointments(): void {
    if (this.currentUserId != null) {
      if (this.currentRole == 'patient') {
        this.appointmentsService
          .getAllAppointmentsForPatient(this.currentUserId)
          .subscribe((response) => {
            this.appointments = response;
          });
      } else {
        this.appointmentsService
          .getAllAppointmentsForDoctor(this.currentUserId)
          .subscribe((response) => {
            this.appointments = response;
          });
      }
    }
  }

  public goToDetails(id: number): void {
    let prefix = '';
    if (this.currentRole == 'patient') {
      prefix = 'patient-appointment';
    } else {
      prefix = 'doctor-appointment';
    }
    this.router.navigate(['appointments', prefix, id]);
  }

  public addAppointment() {
    this.router.navigate(['appointments/doctor-appointment', 'new']);
  }

  private getLocalStorage() {
    const role = localStorage.getItem('currentRole');
    const currentUserId = localStorage.getItem('currentUserId');
    if (role && currentUserId) {
      this.currentRole = role;
      this.currentUserId = Number(currentUserId);
    } else {
      this.currentRole = null;
      this.currentUserId = null;
    }
  }
}
