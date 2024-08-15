import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Import withFetch for fetch support
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),  // Enable fetch API with HttpClient
    provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};





