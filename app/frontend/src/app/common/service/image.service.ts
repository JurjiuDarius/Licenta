import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpService) {}

  public uploadImage(image: File, id: number): void {
    const formData = new FormData();
    formData.append('image', image);
    this.http
      .post(`${this.apiUrl}/users/${id}/upload-image`, formData)
      .subscribe();
  }
}
