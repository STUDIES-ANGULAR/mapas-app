import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit  {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor( private placesService:PlacesService) { }
  
  ngAfterViewInit(): void {
    if( ! this.placesService.useLocation) throw Error ('No hay placesService.UserLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, //mandamos el contenedor html donde renderizamos el mapa
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }



}
