import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from '../service/appointments.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Time } from '@angular/common';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.sass'],
})
export class AppointmentDetailsComponent {
  public appointment: Appointment | null = null;
  public form: FormGroup;
  public isEditable: boolean = false;

  constructor(
    private appointmentsService: AppointmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.getAppointmentById();
    this.form = this.fb.group({
      title: ['', Validators.required],
      requirements: ['', Validators.required],
      address: ['', Validators.required],
      date: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      requiresUpload: [false],
    });
  }

  private getAppointmentById(): void {
    let id_ = this.route.snapshot.paramMap.get('id');
    if (id_ == 'new') {
      this.appointment = {
        id: -1,
        requirements: '',
        address: '',
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        requiresUpload: false,
        doctorId: 0,
      };
      this.isEditable = true;
    } else {
      let id = Number(id_);

      this.appointmentsService.getAppointmentById(id).subscribe((response) => {
        this.appointment = response;
        this.form.patchValue({
          requirements: response.requirements,
          address: response.address,
          date: response.date,
          startTime: response.startTime,
          endTime: response.endTime,
          requiresUpload: response.requiresUpload,
        });
      });
    }
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      const payload = {
        requirements: this.form?.get('requirements')?.value,
        address: this.form?.get('address')?.value,
        date: new Date('YYYY-MM-DD'),
        startTime: this.form?.get('startTime')?.value,
        endTime: this.form?.get('endTime')?.value,
        requiresUpload: this.form?.get('requiresUpload')?.value,
      };
      if (this.appointment?.id == -1) {
        this.appointmentsService.createAppointment(payload).subscribe(() => {
          this.router.navigate(['/appointments']);
        });
      } else {
        this.appointmentsService
          .updateAppointment(this.appointment?.id, payload)
          .subscribe(() => {
            this.getAppointmentById();
          });
      }
    } else {
      console.log('Invalid form');
    }
  }
}
