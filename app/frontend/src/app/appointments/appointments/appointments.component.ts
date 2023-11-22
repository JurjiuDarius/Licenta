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
    this.setRole();
    this.authService.getAuthChanges().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.setRole();
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

  private setRole() {
    const role = localStorage.getItem('currentRole');
    if (role) {
      this.currentRole = role;
    } else {
      this.currentRole = null;
    }
  }
}
