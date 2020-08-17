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
          this.dispositivo = disp[0]; //Se carga el dispositivo cuando llega la respuesta desde el backend
        

        this.MostrarMediciones(this.idDispositivo); //Se muestra la lsita de mediciones
      });
  }

  ngOnInit() {
  }


  MostrarMediciones(idDispositivo){
    this.mServ.getMedicionesByDispositivoId(idDispositivo).then(med=>{
      this.mediciones = med;
    })
  }

}

