import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { customInterceptor } from './service/custom.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([customInterceptor]) 
    ),
    {
      provide: RouteReuseStrategy,
      useClass: class implements RouteReuseStrategy {
        shouldDetach() { return false; }
        store() {}
        shouldAttach() { return false; }
        retrieve() { return null; }
        shouldReuseRoute() { return false; }
      }
    }
  ]
};
