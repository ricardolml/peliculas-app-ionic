import { Component } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

    constructor( private storage: DataLocalService, private moviesServise : MoviesService ) { }
    peliculas : PeliculaDetalle[] = [];
    generos: Genre[] = [];

    favoritoPorGenero : any[] = [];

     
    async ionViewWillEnter(){
        this.peliculas = await this.storage.cargarFavoritos();
        this.generos = await this.moviesServise.getGeneros();
        this.pelisPorGenero( this.generos , this.peliculas );
    }

    pelisPorGenero( generos:Genre[], peliculas:PeliculaDetalle[] ){
        for( let genero of generos ){
            // let buscarPelis = peliculas.filter( peli => peli.genres.find( gene => gene.id === genero.id ));
            this.favoritoPorGenero.push({
                genero : genero.name,
                pelis : peliculas.filter( peli => peli.genres.find( gene => gene.id === genero.id ))
            });
        }
    }

}
