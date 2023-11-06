import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from 'src/app/models/user';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiURL;
  private authChanges: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.authChanges = new Subject<boolean>();
  }

  public logIn(email: string, password: string, role: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { email, password, role })
      .pipe(
        tap((response: any) => {
          this.authChanges.next(true);
          this.setToken(response.token);
          document.cookie = `role=${role}`;
        })
      );
  }

  public logOut(): void {
    this.authChanges.next(false);
    this.removeToken();
  }

  public signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, { user });
  }

  private setToken(token: string): void {
    document.cookie = `token=${token}`;
  }

  private removeToken(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  public decodeJWT(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  public getAuthChanges(): Subject<boolean> {
    return this.authChanges;
  }
}
