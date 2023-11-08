import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  patientForm: FormGroup;
  doctorForm: FormGroup;
  currentForm: FormGroup;
  public role: string = 'patient';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.doctorForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        city: ['', [Validators.required]],
        birthDate: [null, [Validators.required]],
        education: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
    this.patientForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        city: ['', [Validators.required]],
        birthDate: [null, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
    this.currentForm = this.patientForm;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.currentForm.valid) {
      let payload = {
        firstName: this.currentForm.get('firstName')?.value,
        lastName: this.currentForm.get('lastName')?.value,
        email: this.currentForm.get('email')?.value,
        phone: this.currentForm.get('phone')?.value,
        city: this.currentForm.get('city')?.value,
        birth_date: this.currentForm.get('birthDate')?.value,
        password: this.currentForm.get('password')?.value,
        education: '',
      };
      if (this.role === 'doctor') {
        payload['education'] = this.currentForm.get('education')?.value;
      }
      this.authService.signUp(payload, this.role).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else {
      console.log('Invalid form');
    }
  }
  public updateRole(role: string) {
    if (role === 'doctor') {
      this.role = 'doctor';
      this.currentForm = this.doctorForm;
    }
    if (role === 'patient') {
      this.role = 'patient';
      this.currentForm = this.patientForm;
    }
  }
}
