import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ring-of-fire-ee457',
        appId: '1:72530766535:web:41338f98d845191c2a2ce2',
        storageBucket: 'ring-of-fire-ee457.firebasestorage.app',
        apiKey: 'AIzaSyCuQk5v5sEdmOhUjWc9HB0l0Ux5DkIQPU4',
        authDomain: 'ring-of-fire-ee457.firebaseapp.com',
        messagingSenderId: '72530766535'
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
