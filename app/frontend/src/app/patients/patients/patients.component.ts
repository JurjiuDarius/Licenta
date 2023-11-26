import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { UserService } from 'src/app/auth/service/user.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.sass'],
})
export class PatientsComponent {
  public patients: User[] | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.getPatients();
  }

  private getPatients() {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      this.userService
        .getPatientsForDoctor(currentUserId)
        .subscribe((patients: User[]) => {
          this.patients = patients;
        });
    }
  }

  public addPatient() {
    const dialogRef = this.dialog.open(AddPatientDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const currentUserId = localStorage.getItem('currentUserId');
      if (currentUserId) {
        this.userService
          .addPatientForDoctor(result, currentUserId)
          .subscribe((patient) => {
            this.getPatients();
          });
      }
    });
  }

  public goToDetails(id: number): void {
    this.router.navigate(['/patients', id]);
  }
}
