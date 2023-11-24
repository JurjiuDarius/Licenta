import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { PatientsRoutingModule } from './patients-routing.module';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    PatientsRoutingModule,
  ],
})
export class PatientsModule {}
