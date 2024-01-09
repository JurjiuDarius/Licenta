import { Component } from '@angular/core';
import { AuthenticationService } from './auth/service/authentication.service';
import { User } from './models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'frontend';
  public currentUser: User | null = null;
  public currentRole: string | null = null;
  public navDictionary: any = {
    patient: [
      { label: 'Appointments', path: '/appointments' },
      { label: 'My Profile', path: '/profile' },
      { label: 'My Images', path: '/patient-images' },
    ],
    doctor: [
      { label: 'Appointments', path: '/appointments' },
      { label: 'My Patients', path: '/patients' },
      { label: 'My Profile', path: '/profile' },
      { label: 'Images', path: '/doctor-images' },
    ],
    admin: [],
  };
  public navItems: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.setRole();
    this.authService.getAuthChanges().subscribe((isAuthenticated) => {
      this.setRole();
    });
  }
  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  private setRole() {
    const role = localStorage.getItem('currentRole');
    if (role) {
      this.currentRole = role;
    } else {
      this.currentRole = null;
    }
    if (this.currentRole != null) {
      this.navItems = this.navDictionary[this.currentRole];
    }
  }
}
