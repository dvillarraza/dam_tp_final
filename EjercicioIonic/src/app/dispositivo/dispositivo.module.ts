import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispositivoPageRoutingModule } from './dispositivo-routing.module';

import { DispositivoPage } from './dispositivo.page';

import { DirectivaAtributoDirective } from '../directives/directiva-atributo.directive';

import {MyPipePipe} from '../pipes/my-pipe.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule
  ],
  declarations: [DispositivoPage, DirectivaAtributoDirective, MyPipePipe]
})
export class DispositivoPageModule {}
