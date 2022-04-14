import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slidesshow-poster',
    templateUrl: './slidesshow-poster.component.html',
    styleUrls: ['./slidesshow-poster.component.scss'],
})
export class SlidesshowPosterComponent implements OnInit {
    @Input() peliculasRecientes: Pelicula[] = [];

    slideOpts = {
        slidesPerView: 3,
        freeMode: true
    }

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    async verDetalle(id: string | number) {
        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id
            }
        });

        modal.present();
    }

}
