import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    buscar = '';
    peliculas: Pelicula[] = [];
    spinner =  false;
    ideas: string[] = [
        'Spiderman',
        'Avenger',
        'El señor de los anillos',
        'La vida es bella',
    ];

    constructor(private moviesService: MoviesService , private modalCtrl: ModalController) { }

    buscarPelicula(event: any) {
        const valor: string = event.detail.value;
        if (valor.trim() === '') {
            this.peliculas = [];
            return;
        }
        this.spinner= true;
        this.moviesService.getPeliculas( valor ).subscribe( resp =>{
            this.peliculas = resp.results;
            this.spinner = false;
        } );
    }

    async verDetalle( id: string | number ){
        const modal = await this.modalCtrl.create({
            component : DetalleComponent,
            componentProps : {
                id
            }
        });

        modal.present();
    }

}
