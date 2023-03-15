import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  constructor() { }
 
  onQueryChanged( query: string = '' ){

    //limpiamos el time y asi volver a esperar 1 seg por cada tecla presionada
    if( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout(() => {

      console.log('Mandar query:', query);
    }, 1000)

  }

}
