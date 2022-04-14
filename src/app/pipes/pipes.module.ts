import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagePipe } from './filtro-image.pipe';



@NgModule({
    declarations: [
        ImagenPipe,
        ParesPipe,
        FiltroImagePipe
    ],
    exports : [
        ImagenPipe,
        ParesPipe,
        FiltroImagePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
