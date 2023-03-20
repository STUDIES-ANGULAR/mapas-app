import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map; 
  private markers: Marker [] = [];

  get isMapReady(){
    return !!this.map;
  }

  setMapa( map: Map){
    this.map = map;
  }

  flyTo( coords: LngLatLike){
    if( !this.isMapReady)  throw Error ('El mapa no esta inicializado');
    
    this.map?.flyTo({
      zoom:14,
      center: coords
    });
  }

  createMarkersFromPlaces ( places: Feature[], userLocation: [number, number]){
    
    if( !this.map ) throw Error ('mapa no inicializado');

    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    for (const place of places){
      const [ lng, lat ] = place.center;
      const popup = new Popup()
      .setHTML(`
        <h6>${ place.text }</h6>
        <span>${ place.place_name }</span>
      `);
      
      const newMarker = new Marker()
        .setLngLat( [lng, lat])
        .setPopup(popup)
        .addTo (this.map);
  
        newMarkers.push( newMarker );
    }
    
    this.markers = newMarkers;

    if( places.length === 0 ) return;
    //Limites del mapa

    //Ajustamos el mapa para mostrar todos los marcadores encontrados
    const bounds = new LngLatBounds();
    
    for (const marker of newMarkers){ 
      bounds.extend( marker.getLngLat() ) 
    };

    bounds.extend( userLocation );
    //añadimos ubicacion del usuario para liminarl el zoom de markers

    this.map.fitBounds(bounds, {
      padding: 200
    });

  }
}
