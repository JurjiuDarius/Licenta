import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentDetailsDoctorComponent } from './appointment-details-doctor/appointment-details-doctor.component';
import { AppointDetailsPatientComponent } from './appoint-details-patient/appoint-details-patient.component';

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
    component: AppointDetailsPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
