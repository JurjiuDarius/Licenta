import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private readonly API_URL = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<any> {
    return this.http.get(this.API_URL + '/appointments');
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL + '/appointments'}/${id}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.API_URL + '/appointments', appointment);
  }

  updateAppointment(id: number | undefined, appointment: any): Observable<any> {
    if (!id) {
      console.log('Id not defined!');
      return of('Id not defined!');
    }
    return this.http.put(
      `${this.API_URL + '/appointments'}/${id}`,
      appointment
    );
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL + '/appointments'}/${id}`);
  }
}
