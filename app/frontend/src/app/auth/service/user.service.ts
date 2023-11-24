import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiURL;
  constructor(private http: HttpService) {}

  public getPatientsForDoctor(id: number): any {
    return this.http.get(`${this.apiUrl}/users/doctor-patients/${id}`);
  }

  public getUserName(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/users/name${id}`);
  }
}
