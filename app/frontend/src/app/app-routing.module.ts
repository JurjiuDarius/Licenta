import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'doctor-images',
    loadChildren: () =>
      import('./doctor-images/doctor-images.module').then(
        (m) => m.DoctorImagesModule
      ),
  },
  {
    path: 'profile',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
