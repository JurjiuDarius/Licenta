import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.sass'],
})
export class PatientsComponent {
  public patients: User[] = [];

  constructor(private router: Router) {}

  public addPatient() {}

  public goToDetails(id: number): void {
    this.router.navigate(['/patients', id]);
  }
}
