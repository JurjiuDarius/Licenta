import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from 'src/app/utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpService) {}

  getAllAppointments(): Observable<any> {
    return this.http.get(this.apiUrl + '/appointments');
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl + '/appointments'}/${id}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl + '/appointments', appointment);
  }

  updateAppointment(id: number | undefined, appointment: any): Observable<any> {
    if (!id) {
      console.log('Id not defined!');
      return of('Id not defined!');
    }
    return this.http.put(`${this.apiUrl + '/appointments'}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl + '/appointments'}/${id}`);
  }
}
