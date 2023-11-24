import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PatientsComponent],
  imports: [CommonModule, MatCardModule],
})
export class PatientsModule {}
