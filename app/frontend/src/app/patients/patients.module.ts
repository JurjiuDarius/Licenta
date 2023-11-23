import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patient/patient.component';



@NgModule({
  declarations: [
    PatientsComponent,
    PatientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PatientsModule { }
