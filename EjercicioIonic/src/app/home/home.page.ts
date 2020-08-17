import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

//  constructor() {}
dispositivos:Array<Dispositivo>;
// dispositivos:Array<Intdispositivo>;
 
// constructor() {  
   constructor(public listadodispositivos:DispositivoService) {   

     listadodispositivos.getListado().then(disps=>{
      this.dispositivos = disps;
     });

  /* this.dispositivos = new Array<Dispositivo>();

    console.log(listadodispositivos.getDispositivos());  

   this.dispositivos.push(new Dispositivo(1, "Sensor 1", "Patio", 1));
   this.dispositivos.push(new Dispositivo(2, "Sensor 2", "Cocina", 2));
   this.dispositivos.push(new Dispositivo(3, "Sensor 3", "Jardin Delantero", 3));
   this.dispositivos.push(new Dispositivo(4, "Sensor 2", "Living", 4));
*/
  }

}
