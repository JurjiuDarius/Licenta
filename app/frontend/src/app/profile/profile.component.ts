import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/service/authentication.service';
import { UserService } from '../auth/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent {
  patientForm: FormGroup;
  doctorForm: FormGroup;
  currentForm: FormGroup;
  public role: string | null = 'patient';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      birthDate: [null, [Validators.required]],
      education: ['', [Validators.required]],
    });
    this.patientForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      birthDate: [null, [Validators.required]],
    });
    this.role = localStorage.getItem('currentRole');
    if (this.role === 'doctor') {
      this.currentForm = this.doctorForm;
    } else {
      this.currentForm = this.patientForm;
    }
    this.initForm();
  }

  private initForm() {
    const currentId = localStorage.getItem('currentUserId');
    if (!currentId) {
      this.snackBar.open('Error fetching profile data', 'Close');
      this.router.navigate(['/appointments']);
      return;
    }
    this.userService.getUserById(currentId).subscribe((user) => {
      const birthDate = new Date(user.birthDate);
      this.currentForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        birthDate: birthDate,
      });
      if (user.education) {
        this.currentForm.patchValue({
          education: user.education,
        });
      }
    });
  }
  onSubmit() {
    if (this.currentForm.valid) {
      const id = Number(localStorage.getItem('currentUserId'));
      let payload = {
        id: id,
        firstName: this.currentForm.get('firstName')?.value,
        lastName: this.currentForm.get('lastName')?.value,
        email: this.currentForm.get('email')?.value,
        phone: this.currentForm.get('phone')?.value,
        city: this.currentForm.get('city')?.value,
        birthDate: this.currentForm.get('birthDate')?.value,
        education: '',
      };
      if (this.role === 'doctor') {
        payload['education'] = this.currentForm.get('education')?.value;
      }
      this.userService.modifyUser(payload).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else {
      console.log('Invalid form');
    }
  }
}
