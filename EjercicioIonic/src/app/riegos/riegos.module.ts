import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiegosPageRoutingModule } from './riegos-routing.module';

import { RiegosPage } from './riegos.page';
import { MyPipePipe } from '../pipes/my-pipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiegosPageRoutingModule
  ],
  declarations: [RiegosPage, MyPipePipe]
})
export class RiegosPageModule {}
