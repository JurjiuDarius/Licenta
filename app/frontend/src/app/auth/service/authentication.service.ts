import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
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
          this.setToken(response.token);
          this.authChanges.next(true);
        })
      );
  }

  public logOut(): void {
    this.removeToken();
    this.authChanges.next(false);
  }

  public signUp(user: any, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, { user, role });
  }

  private setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  private removeToken(): void {
    localStorage.removeItem('jwtToken');
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
