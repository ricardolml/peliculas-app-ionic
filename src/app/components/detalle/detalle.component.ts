import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

    @Input() id;

    pelicula : PeliculaDetalle = {};
    actores: Cast[] = [];
    ocultar:number = 150;
    estrella : string = 'star-outline';

    slideOptActores = {
        slidesPerView : 3.3,
        freeMode : true,
        spaceBetween : -5
    }

    constructor( private moviesService : MoviesService , private modalCtrl : ModalController, private storageService : DataLocalService ) { }

    ngOnInit() { 
        // console.log("ID:" +this.id);

        this.storageService.existePelicula( this.id ).then(
            existe => this.estrella = ( existe ) ? 'star' : 'star-outline'
        );

        this.moviesService.getPeliculaDetalle( this.id )
        .subscribe( pelicula => {
            this.pelicula = pelicula;
        });


        this.moviesService.getActores(this.id).subscribe( resp => this.actores = resp.cast );
    }

    regresar(){
        this.modalCtrl.dismiss();
    }

    favorito(){
        const existe = this.storageService.guardarPeliculas( this.pelicula );
        this.estrella = ( existe ) ? 'star' : 'star-outline';
    }

}
