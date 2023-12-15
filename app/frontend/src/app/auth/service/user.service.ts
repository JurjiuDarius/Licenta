import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user';
import { HttpService } from 'src/app/deprecated/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiURL;
  constructor(private http: HttpClient) {}

  public getPatientsForDoctor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/doctor-patients/${id}`);
  }

  public getUserName(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/name/${id}`);
  }

  public addPatientForDoctor(
    patientEmail: any,
    doctorId: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/add-patient/${doctorId}`, {
      email: patientEmail,
    });
  }

  public modifyUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users`, user);
  }
}
