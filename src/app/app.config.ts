import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withHashLocation() // ✅ ADD THIS
    ),
    provideAnimations(),
  ],
};