import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatCard, MatCardModule } from '@angular/material/card';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { IgxTimePickerModule } from 'igniteui-angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [AppointmentsComponent, AppointmentDetailsComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    IgxTimePickerModule,
    ReactiveFormsModule,
  ],
})
export class AppointmentsModule {}
