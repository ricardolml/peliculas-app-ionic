import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    peliculas: PeliculaDetalle[] = [];
    private _storage: Storage | null = null;


    constructor(private storage: Storage, private toastController: ToastController) {
        this.init();
    }

    async presentToast( message : string ) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
        this.cargarFavoritos();
    }

    async cargarFavoritos(){
        const peliculas = await this.storage.get('peliculas'); 
        this.peliculas = peliculas || [];
        return peliculas;
    }

    guardarPeliculas(pelicula: PeliculaDetalle) {
        let existe = false;
        let mensaje = '';
        for (const peli of this.peliculas) {
            if (peli.id === pelicula.id) {
                existe = true;
            }
        }

        if (existe) {
            this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
            mensaje = 'Remobido de Favoritos';
        } else {
            this.peliculas.push(pelicula);
            mensaje = 'Agregada a Favoritos';
        }

        this.presentToast(mensaje);
        this._storage.set('peliculas', this.peliculas);

        return !existe;
    }

    async existePelicula( id ){
        await this.cargarFavoritos();
        const existe = this.peliculas.find( peli => peli.id === id );        
        return ( existe ) ? true : false ;
    }
}
