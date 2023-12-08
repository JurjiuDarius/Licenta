import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  public uploadImage(image: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    return this.http.post(
      `${this.apiUrl}/images/user-upload/${userId}`,
      formData
    );
  }

  public getImagesForUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/user-images/${userId}`);
  }
}
