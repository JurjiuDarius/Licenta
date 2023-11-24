import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user';
import { HttpService } from 'src/app/utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiURL;
  constructor(private http: HttpService) {}

  public getPatientsForDoctor(id: string): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/users/doctor-patients/${id}`);
  }

  public getUserName(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/users/name${id}`);
  }

  public addPatientForDoctor(
    patientEmail: any,
    doctorId: string
  ): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/users/add-patient/${doctorId}`, {
      patientEmail,
    });
  }
}
