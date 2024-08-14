import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Updated to provideAnimations

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),         // Set up routing
    provideClientHydration(),      // Handle client hydration (SSR support)
    provideHttpClient(),           // Enable HTTP client functionality
    provideAnimations()            // Enable animations support
  ]
};
