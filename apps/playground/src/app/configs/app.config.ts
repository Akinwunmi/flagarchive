import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from '../app.routes';
import { FIREBASE_CONFIG } from './firebase.config';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideFirestore(() => getFirestore()),
    provideRouter(APP_ROUTES),
    provideExperimentalZonelessChangeDetection(),
  ],
};
