import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "danotes-fb92e", "appId": "1:130738757684:web:b78901e3a438629a09aa61", "storageBucket": "danotes-fb92e.firebasestorage.app", "apiKey": "AIzaSyCRqpk6GSrbfcUt9Mra10939Y-9tk7osig", "authDomain": "danotes-fb92e.firebaseapp.com", "messagingSenderId": "130738757684" }))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
