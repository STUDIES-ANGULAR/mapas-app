import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation: [number, number] | undefined;

  public isLoadingPlaces : boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean{
    //return true si hay un useLocation
    return !!this.useLocation;
  }

  constructor( private http: HttpClient ) { 
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

  getPlacesByQuery ( query: string = '' ) {
    //TODO: Evaluar cuando query es vacio
    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?country=co&proximity=-76.98138579564743, 3.874269146317644&language=es&access_token=pk.eyJ1IjoiYXJsZXlyaXZhczIwMjIiLCJhIjoiY2xhOTd3dzIyMDdkeTN4cmh5bjI5MXg2YSJ9.D0OchwHmMxJ2wHO7Z6rtKw&limit=5`)
    .subscribe(  resp => {
      
      console.log(resp.features);

      this.isLoadingPlaces = false;
      this.places = resp.features;

    })
  }
} 
