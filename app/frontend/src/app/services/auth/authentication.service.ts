import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiURL;
  private currentUser: any;

  constructor(private http: HttpClient) {}

  public logIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        this.currentUser = response.user;
        this.setToken(response.token);
      })
    );
  }

  public logOut(): void {
    this.currentUser = null;
    this.removeToken();
  }

  public signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password }).pipe(
      tap((response: any) => {
        this.currentUser = response.user;
        this.setToken(response.token);
      })
    );
  }

  public signUp(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password }).pipe(
      tap((response: any) => {
        this.currentUser = response.user;
        this.setToken(response.token);
      })
    );
  }

  private setToken(token: string): void {
    document.cookie = `token=${token}`;
  }

  private removeToken(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  public getCurrentUser() {
    return this.currentUser;
  }
}
