import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let clonedRequest = req;
  if (token) {
    clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && localStorage.getItem('refresh_token')) {
        return authService.refreshToken().pipe(
          switchMap((newTokens: any) => {
            authService.storeTokens(newTokens);
            const newRequest = req.clone({
              setHeaders: { Authorization: `Bearer ${newTokens.access}` }
            });
            return next(newRequest);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
