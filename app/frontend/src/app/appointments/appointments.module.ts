import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardModule } from '@angular/material/card';
import { AppointmentDetailsDoctorComponent } from './appointment-details-doctor/appointment-details-doctor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { IgxTimePickerModule } from 'igniteui-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppointmentDetailsPatientComponent } from './appointment-details-patient/appointment-details-patient.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ImageComponent } from '../image/image.component';
@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentDetailsDoctorComponent,
    AppointmentDetailsPatientComponent,
    AppointmentDetailsPatientComponent,
    ImageUploadComponent,
    ImageComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    IgxTimePickerModule,
    ReactiveFormsModule,
  ],
})
export class AppointmentsModule {}
