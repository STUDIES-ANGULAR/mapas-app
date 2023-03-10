import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYXJsZXlyaXZhczIwMjIiLCJhIjoiY2xhOTd3dzIyMDdkeTN4cmh5bjI5MXg2YSJ9.D0OchwHmMxJ2wHO7Z6rtKw';

if( !navigator.geolocation ){
  alert('Navegador no soporta la Geolacation');
  throw new Error('Navegador no soporta la Geolacation');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
