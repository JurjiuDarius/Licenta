import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'frontend';
  public currentUser: any;

  constructor(private authService: AuthenticationService) {
    this.currentUser = this.authService.getCurrentUser();
  }
}
