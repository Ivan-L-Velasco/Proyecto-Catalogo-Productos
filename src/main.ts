import { bootstrapApplication } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; import { BrowserModule } from '@angular/platform-browser'; // Asegúrate de importar BrowserModule
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importar las rutas desde app-routing.module

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule), // Asegúrate de importar BrowserModule
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), provideAnimationsAsync() // Proveer las rutas
  ]
})
.catch(err => console.error(err));
