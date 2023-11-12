import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.sass'],
})
export class AppointmentsComponent {
  public currentRole: string | null = null;
  public appointments: Appointment[] = [];

  constructor(
    private appointmentsService: AppointmentsService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.getAllAppointments();
    this.authService.getAuthChanges().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        if (token) {
          const tokenValue = token
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];
          if (tokenValue) {
            const decodedToken = this.authService.decodeJWT(tokenValue);
            this.currentRole = decodedToken.role;
          }
        } else {
          this.currentRole = null;
        }
      } else {
        this.currentRole = null;
      }
    });
  }

  ngOnInit(): void {}

  public getAllAppointments(): void {
    this.appointmentsService.getAllAppointments().subscribe((response) => {
      this.appointments = response;
    });
  }

  public goToDetails(id: number): void {
    this.router.navigate(['/appointments', id]);
  }

  public addAppointment() {
    this.router.navigate(['/appointments/new']);
  }
}
