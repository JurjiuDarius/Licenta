import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader/service/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return next.handle(request);
    }
    const authorizedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(authorizedRequest).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
}
