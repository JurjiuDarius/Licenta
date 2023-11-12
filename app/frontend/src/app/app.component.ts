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
    ],
    doctor: [
      { label: 'Appointments', path: '/appointments' },
      { label: 'My Profile', path: '/profile' },
      { label: 'My Patients', path: '/doctors' },
    ],
    admin: [],
  };
  public navItems: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.setToken();
    this.authService.getAuthChanges().subscribe((isAuthenticated) => {
      this.setToken();
      if (this.currentRole != null) {
        this.navItems = this.navDictionary[this.currentRole];
      }
    });
  }
  public logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  private setToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenValue = token
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
      if (tokenValue) {
        const decodedToken = this.authService.decodeJWT(tokenValue);
        this.currentRole = decodedToken.role;
      }
    } else {
      this.currentRole = null;
    }
  }
}
