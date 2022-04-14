import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slidesshow-pares',
    templateUrl: './slidesshow-pares.component.html',
    styleUrls: ['./slidesshow-pares.component.scss'],
})
export class SlidesshowParesComponent implements OnInit {

    @Input() peliculasRecientes: Pelicula[] = [];
    @Output() cargarMas= new EventEmitter();

    slideOpts = {
        slidesPerView: 2,
        freeMode: true,
        spaceBetween : -10
    }

    constructor(private modalCtrl : ModalController) { }

    ngOnInit() { }

    onClick(){
       this.cargarMas.emit();
    }

    async verDetalle( id : string ){
        const modal = await this.modalCtrl.create({
            component : DetalleComponent,
            componentProps : {
                id
            }
        });
        modal.present();
    }

}
