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
    private MapService: MapService ) { }

  get isLoadingPlaces(): boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesService.places;
  }

  flyTo( place : Feature ){
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.MapService.flyTo([ lng, lat ]);

  }
}
