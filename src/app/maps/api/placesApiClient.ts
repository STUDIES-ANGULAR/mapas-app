import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn:'root'
})
export class PlacesApiClient extends HttpClient{

    public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    //para manejar peticiones como si fuese el HttpClient
    constructor( handler: HttpHandler ){
        super(handler);
    }

    // sobreescribimos el get
    public override get<T>( url: string, options:{
        //en este options: { params?: ....} lo sacamos de la firma del get y en el  mandamos las coordenada de proximity
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
    } ){
        
        url = this.baseUrl + url;
        return super.get<T>( url, {
            params: {
                limit: 5,
                lenguage: 'es',
                access_token: environment.apiKey,
                ...options.params //desestructuramos los params que se manden a la peticion
            }

        } );
    }
    
}