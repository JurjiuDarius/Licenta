import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { PatientsRoutingModule } from './patients-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPatientDialogComponent } from './add-patient-dialog/add-patient-dialog.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PatientsComponent, AddPatientDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    PatientsRoutingModule,
    MatInputModule,
    FormsModule,
  ],
})
export class PatientsModule {}
