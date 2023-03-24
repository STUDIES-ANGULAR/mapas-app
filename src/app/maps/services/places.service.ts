import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

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

  constructor( 
    private placeApi: PlacesApiClient,
    private mapService: MapService ) { 
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
          alert('No se puede obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    
    });
  }

  getPlacesByQuery ( query: string = '' ) {
    //TODO: Evaluar cuando query es vacio
    if ( query.length === 0 ){
      this.places= [];
      this.isLoadingPlaces = false;      
      return;
    }

    if( !this.useLocation ){ 
      throw Error('No hay userLocation');
    }

    this.isLoadingPlaces = true;

    this.placeApi.get<PlacesResponse>(`/${ query }.json`, { 
      params: {
        proximity: this.useLocation.join(',')
      }
    })
    .subscribe(  resp => {
      
      console.log(resp.features);

      this.isLoadingPlaces = false;
      this.places = resp.features;

      this.mapService.createMarkersFromPlaces( this.places, this.useLocation! );

    })
  }

  deletePlaces(){
    this.places = [];
  }
} 
