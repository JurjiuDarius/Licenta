import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = environment.apiURL;
  constructor(private http: HttpClient) {}

  public get(url: string): any {
    const headerDict = this.getAuthorizationHeader();
    return this.http.get(`${url}`, { headers: new HttpHeaders(headerDict) });
  }

  public post(url: string, body: any): any {
    const headerDict = this.getAuthorizationHeader();
    return this.http.post(`${url}`, body, {
      headers: new HttpHeaders(headerDict),
    });
  }

  public put(url: string, body: any): any {
    const headerDict = this.getAuthorizationHeader();

    return this.http.put(`${url}`, body, {
      headers: new HttpHeaders(headerDict),
    });
  }

  public delete(url: string): any {
    const headerDict = this.getAuthorizationHeader();
    return this.http.delete(`${url}`, { headers: new HttpHeaders(headerDict) });
  }

  private getAuthorizationHeader(): any {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      const headerDict = null;
    }
    const headerDict = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return headerDict;
  }
}
