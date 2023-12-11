import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/deprecated/http.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  public uploadImage(image: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(
      `${this.apiUrl}/images/user-upload/${userId}`,
      formData
    );
  }

  public processImage(
    imageId: number,
    processingType: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/images/process-image/${imageId}/${processingType}`
    );
  }

  public getOriginalImagesForPatient(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/user-images-all/${userId}`);
  }
  public getAllImagesForUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/user-images/${userId}`);
  }
  public deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/images/${id}`);
  }
}
