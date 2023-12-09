import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { UserService } from 'src/app/auth/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private userService: UserService,
    private snackbar: MatSnackBar
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
        this.userService.addPatientForDoctor(result, currentUserId).subscribe({
          next: (patient) => {
            this.getPatients();
            this.snackbar.open('Patient added successfully!', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            this.snackbar.open('No such patient was found!', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  public goToDetails(id: number): void {
    this.router.navigate(['/patients', id]);
  }
}
