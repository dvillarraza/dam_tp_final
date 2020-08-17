import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

dispositivos:Array<Dispositivo>;
 
   constructor(public listadodispositivos:DispositivoService) {   

    //Cargo lista de dispositivos en el DOM
     listadodispositivos.getListado().then(disps=>{
      this.dispositivos = disps;
     });

  }

}
