import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImage'
})
export class FiltroImagePipe implements PipeTransform {

  transform(pelicula : PeliculaDetalle[]) : PeliculaDetalle[] {

        return pelicula.filter( peli => {return peli.backdrop_path} )  ;
  }

}
