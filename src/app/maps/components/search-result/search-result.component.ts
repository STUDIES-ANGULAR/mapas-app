import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent{

  public selectedId: string = '';

  constructor( 
    private placesService: PlacesService,
    private mapService: MapService ) { }

  get isLoadingPlaces(): boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesService.places;
  }

  flyTo( place : Feature ){
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapService.flyTo([ lng, lat ]);

  }

  getDirections( place: Feature ){
    if( !this.placesService.useLocation ) throw Error(' No hay userLocation');

    const start = this.placesService.useLocation;
    const end = place.center as [number, number];
    
    this.mapService.getRouteBetweenToPoints(start, end);
  }
}
