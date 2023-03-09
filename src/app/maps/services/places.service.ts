import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation: [number, number] | undefined;

  get isUserLocationReady(): boolean{
    //return true si hay un useLocation
    return !!this.useLocation;
  }

  constructor() { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject) => {
    
      navigator.geolocation.getCurrentPosition(
        //successCallback args es de tipo GeolocationPosition
        ( args ) => {
          this.useLocation = [args.coords.longitude, args.coords.latitude];
          console.log('this.useLocation', this.useLocation);
          resolve(this.useLocation);
        },
        ( err ) => {
          alert('No se puede obtener la geolocalizacion')
          console.log(err);
          reject();
        }
      );
    
    });
  }

} 
