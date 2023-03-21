import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn:'root'
})
export class DirectionApiCliente extends HttpClient{

    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

    //para manejar peticiones como si fuese el HttpClient
    constructor( handler: HttpHandler ){
        super(handler);
    }

    // sobreescribimos el get
    public override get<T>( url: string ){
        
        url = this.baseUrl + url;
        return super.get<T>( url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                language: 'es',
                overview: 'simplified',
                steps: false,
                access_token: environment.apiKey
            }

        } );
    }
    
}