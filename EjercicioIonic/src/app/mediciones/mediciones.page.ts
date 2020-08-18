import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';


@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  public dispositivo:Dispositivo;
  public mediciones:Medicion[];
 
  public idDispositivo;

  constructor(
    private router:ActivatedRoute, 
    private dServ:DispositivoService,
    private mServ:MedicionService) { 
      this.idDispositivo = this.router.snapshot.paramMap.get('id');

      this.dServ.getDispositivoById(this.idDispositivo).then((disp)=>{
          this.dispositivo = disp; //Se carga el dispositivo cuando llega la respuesta desde el backend
          this.MostrarMediciones(this.idDispositivo); //Se carga la lista de mediciones
      });
  }

  ngOnInit() {
  }

  //Funcion que carga la lista de mediciones que se muestran en una tabla en el DOM
  MostrarMediciones(idDispositivo){
    this.mServ.getMedicionesByDispositivoId(idDispositivo).then(med=>{
      this.mediciones = med; //Lista de mediciones que se muestra en el DOM
    })
  }
}

