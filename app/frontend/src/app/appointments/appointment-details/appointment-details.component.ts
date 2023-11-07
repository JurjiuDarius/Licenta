import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentsService } from '../service/appointments.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.sass'],
})
export class AppointmentDetailsComponent {
  public appointment: Appointment | null = null;
  public form: FormGroup;

  constructor(
    private appointmentsService: AppointmentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.getAppointmentById();
    this.form = this.fb.group({
      title: ['', Validators.required],
      requirements: ['', Validators.required],
      address: ['', Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      requiresUpload: [false],
    });
  }

  private getAppointmentById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentsService.getAppointmentById(id).subscribe((response) => {
      this.appointment = response;
      this.form.patchValue({
        title: response.title,
        requirements: response.requirements,
        address: response.address,
        startTime: response.startTime,
        endTime: response.endTime,
        requiresUpload: response.requiresUpload,
      });
    });
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      const payload = {
        title: this.form?.get('title')?.value,
        requirements: this.form?.get('requirements')?.value,
        address: this.form?.get('address')?.value,
        startTime: this.form?.get('startTime')?.value,
        endTime: this.form?.get('endTime')?.value,
        requiresUpload: this.form?.get('requiresUpload')?.value,
      };
      this.appointmentsService
        .updateAppointment(this.appointment?.id, payload)
        .subscribe(() => {
          this.getAppointmentById();
        });
    } else {
      console.log('Invalid form');
    }
  }
}
