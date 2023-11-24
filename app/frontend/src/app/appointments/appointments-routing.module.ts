import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailsDoctorComponent } from './appointment-details-doctor/appointment-details-doctor.component';
import { AppointmentDetailsPatientComponent } from './appointment-details-patient/appointment-details-patient.component';
const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
  },
  {
    path: 'doctor-appointment/:id',
    component: AppointmentDetailsDoctorComponent,
  },
  {
    path: 'patient-appointment/:id',
    component: AppointmentDetailsPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
