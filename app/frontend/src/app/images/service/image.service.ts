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
    imageId: string,
    processingType: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/images/process-image/${imageId}/${processingType}`
    );
  }

  public getOriginalImagesForPatient(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/user-images/${userId}`);
  }
  public getAllImagesForPatient(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/user-images-all/${userId}`);
  }
  public deleteImage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/images/${id}`);
  }
}
