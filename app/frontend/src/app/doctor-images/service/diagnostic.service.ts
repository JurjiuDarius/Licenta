import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Diagnostic } from 'src/app/models/diagnostic';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  public saveDiagnostic(diagnostic: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/diagnostic`, diagnostic);
  }

  public getDiagnosticForImage(imageId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/diagnostic/${imageId}`);
  }
}
