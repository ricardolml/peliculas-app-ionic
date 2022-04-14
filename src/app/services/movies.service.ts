import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const api_key = environment.apiKey;

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    private popularesPage:number =0;
    generos :Genre[] = [];
    constructor( private http : HttpClient ) { }

    private ejecutarQuery<T>( query: string){
        query = URL + query;
        query+= `&api_key=${api_key}&language=es&include_image_language=es`;
        // console.log(query);
        return this.http.get<T>( query );
    }

    getFecture(){
        const hoy = new Date();
        const mes = hoy.getMonth() + 1;
        
        const ultimoDia = new Date( hoy.getFullYear(), mes , 0  ).getDate()
        let mesString = ( mes < 10 ) ? '0' + mes : mes ;

        const inicio = `${hoy.getFullYear()}-${mesString}-01`; 
        const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`; 

        return this.ejecutarQuery<RespuestaMDB>( `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
    }

    getPopulares(){
        this.popularesPage++;
        const query =`/discover/movie?sort_by=pupularity.desc&page=${this.popularesPage}`
        return this.ejecutarQuery<RespuestaMDB>(query);
    }

    getPeliculaDetalle( id:string ){
        return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
    }

    getActores( id:string ){
        return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
    }

    getPeliculas( query: string ){
        return this.ejecutarQuery<RespuestaMDB>( `/search/movie?query=${query}`);
    }
    getGeneros(): Promise<Genre[]>{
        return new Promise( resolve =>{
            this.ejecutarQuery("/genre/movie/list?a=1").subscribe(
                resp => {
                    this.generos = resp['genres'];
                    resolve(this.generos);
                }
            );
        } );        
    }
}
