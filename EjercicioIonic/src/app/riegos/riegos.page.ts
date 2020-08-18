import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { Electrovalvula } from '../model/Electrovalvula';
import { RiegoService } from '../services/riego.service';
import { Riego } from '../model/Riego';


@Component({
  selector: 'app-riegos',
  templateUrl: './riegos.page.html',
  styleUrls: ['./riegos.page.scss'],
})
export class RiegosPage implements OnInit {

  public electrovalvula:Electrovalvula;
  public riegos:Riego[];
  public idElectro;

  constructor(
    private router:ActivatedRoute, 
    private eServ:ElectrovalvulaService,
    private rServ:RiegoService) { 
      
      this.idElectro = this.router.snapshot.paramMap.get('electroid');
      this.eServ.getElectrovalvulaById(this.idElectro).then(elv=>{
        this.electrovalvula = elv[0]; //Se carga la electrovalvula cuando llega la respuesta desde el backend
        this.MostrarRiegos(this.idElectro); //Se crea la lista de riegos de la electrovalvula
      });
  }

  ngOnInit() {
  }

  //Funcion que carga la lista de riegos que se muestran en una tabla en el DOM
  MostrarRiegos(idElectrovalvula){
    this.rServ.getRiegosByElectrovalvulaId(idElectrovalvula).then(rg=>{
      this.riegos = rg; //Lista de riegos que se muestra en el DOM
    })
  }

}
