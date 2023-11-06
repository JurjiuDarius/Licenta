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
      { label: 'My Doctors', path: '/doctors' },
      { label: 'Log Out', path: '/login' },
    ],
    doctor: [
      { label: 'Appointments', path: '/appointments' },
      { label: 'My Profile', path: '/profile' },
      { label: 'My Patients', path: '/doctors' },
      { label: 'Log Out', path: '/login' },
    ],
    admin: [],
  };
  public navItems: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.getAuthChanges().subscribe((isAuthenticated) => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='));
      if (token) {
        const tokenValue = token.split('=')[1];
        const decodedToken = this.authService.decodeJWT(tokenValue);
        this.currentRole = decodedToken.role;
      }

      if (this.currentRole != null) {
        this.navItems = this.navDictionary[this.currentRole];
      }
    });
  }
  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
