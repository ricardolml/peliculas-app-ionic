import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slidesshow-backdrop',
    templateUrl: './slidesshow-backdrop.component.html',
    styleUrls: ['./slidesshow-backdrop.component.scss'],
})
export class SlidesshowBackdropComponent implements OnInit {

    @Input() peliculasRecientes: Pelicula[] = [];

    slideOpts = {
        slidesPerView: 1.3,
        freeMode: true
    };

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    async verDetalle(id: number | string) {
        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id
            }
        });

        modal.present();
    }

}
