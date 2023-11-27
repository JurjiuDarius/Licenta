import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from '../service/appointments.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { UserService } from 'src/app/auth/service/user.service';
import { User } from 'src/app/models/user';
import { timeSlotValidator } from 'src/app/utils/validators/time-slot-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details-doctor.component.html',
  styleUrls: ['./appointment-details-doctor.component.sass'],
})
export class AppointmentDetailsDoctorComponent {
  public appointment: Appointment | null = null;
  public form: FormGroup;
  public currentUserId: number | null = null;
  public currentRole: string | null = null;
  public patients: User[] = [];

  constructor(
    private appointmentsService: AppointmentsService,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getPatients();
    this.getAppointmentById();
    this.form = this.fb.group(
      {
        requirements: ['', Validators.required],
        address: ['', Validators.required],
        date: [null, Validators.required],
        patientId: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        requiresUpload: [false],
      },
      { validators: timeSlotValidator }
    );
  }

  private getAppointmentById(): void {
    let id_ = this.route.snapshot.paramMap.get('id');
    if (id_ == 'new') {
      this.appointment = {
        id: -1,
        requirements: '',
        address: '',
        date: new Date(),
        patientId: null,
        startTime: new Date(),
        endTime: new Date(),
        requiresUpload: false,
        doctorId: 0,
      };
    } else {
      let id = Number(id_);

      this.appointmentsService.getAppointmentById(id).subscribe((response) => {
        this.appointment = response;
        this.form.patchValue({
          requirements: response.requirements,
          address: response.address,
          patientId: response.patientId,
          date: response.date,
          startTime: response.startTime,
          endTime: response.endTime,
          requiresUpload: response.requiresUpload,
        });
      });
    }
  }

  public onSubmit(): void {
    console.log(this.form);
    if (this.form?.valid) {
      const payload = {
        requirements: this.form?.get('requirements')?.value,
        address: this.form?.get('address')?.value,
        date: this.form?.get('date')?.value,
        startTime: this.form?.get('startTime')?.value,
        endTime: this.form?.get('endTime')?.value,
        patientId: this.form?.get('patientId')?.value,
        doctorId: Number(localStorage.getItem('currentUserId')),
        requiresUpload: this.form?.get('requiresUpload')?.value,
      };

      if (this.appointment?.id == -1) {
        this.appointmentsService.createAppointment(payload).subscribe({
          next: () => {
            this.router.navigate(['/appointments']);
          },
          error: (error) => console.log(error),
        });
      } else {
        this.appointmentsService
          .updateAppointment(this.appointment?.id, payload)
          .subscribe({
            next: () => {
              this.snackbar.open('Appointment added successfully!', 'Close', {
                duration: 3000,
              });
              this.router.navigate(['/appointments']);
            },
            error: () => {
              this.snackbar.open('There has been an error.', 'Close');
            },
          });
      }
    } else {
      console.log('Invalid form');
    }
  }

  private getPatients(): void {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      this.userService
        .getPatientsForDoctor(currentUserId)
        .subscribe((patients: User[]) => {
          this.patients = patients;
        });
    }
  }
}
