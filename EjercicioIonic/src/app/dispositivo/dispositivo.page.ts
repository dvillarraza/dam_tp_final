import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Medicion } from '../model/Medicion';
import { Electrovalvula } from '../model/Electrovalvula';
import { Riego } from '../model/Riego'
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { RiegoService } from '../services/riego.service';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  public dispositivo:Dispositivo;
  public electrovalvula:Electrovalvula;
  public medicion:Medicion;
  public mediciones:Medicion[];
  public riego:Riego;

  //public valormed: number = 0; //Usado en el DOM para hacer una interpolacion

  public valorObtenido:number=0;
  public myChart;
  private chartOptions;


  constructor(
    private router:ActivatedRoute, 
    private dServ:DispositivoService, 
    private mServ:MedicionService, 
    private eServ:ElectrovalvulaService,
    private rServ:RiegoService) {


   }

  ngOnInit() {

    let idDispositivo = this.router.snapshot.paramMap.get('id');

    this.dServ.getDispositivoById(idDispositivo).then((disp)=>{
      this.dispositivo = disp[0]; //Se carga el dispositivo cuando llega la respuesta desde el backend

     //Obtengo la ultima muestra registrada para mostrar en el instrumento
      this.mServ.getMedicionByDispositivoId(idDispositivo).then(med=>{
        if(med != null){
          this.valorObtenido = Number(med.valor);
          } 
        else
          this.valorObtenido = 0;

        //Creo el instrumento con el valor de la medicion leido de la base o en 0 si no hay medicion
        this.generarChart();

        //Obtengo los datos de la electrovalvula
        this.eServ.getElectrovalvulaById(this.dispositivo.electrovalvulaId).then(elv=>{
          this.electrovalvula = elv[0];
          
          //Obtengo el ultimo estado de la electrovalvula para indicar en el DOM el estado del suelo
          this.rServ.getRiegoByElectrovalvulaId(this.electrovalvula.electrovalvulaId).then(rg =>{
            if (rg != null)
              this.riego = rg;
            else
              this.riego = new Riego(99,"",0,0);
          });
        })
      });
    });
  }

  ionViewDidEnter() {
  
  }

  CambiarEstadoElectrovalvula(idElectrovalvula:number){
     
  let nuevoestadoelv = 1;
  
  if(this.riego != null){
    if(this.riego.apertura) //Si la electrovalvula esta abierta 
      nuevoestadoelv = 0; //Nuevo estado cerrada
    else
      nuevoestadoelv = 1; //Nuevo estado abierta
  }

  //Creo nuevo objeto riego con la fecha y hora actual y con el estado nuevo de la electrovalvula
  let r : Riego= new Riego(99,moment().format("YYYY-MM-DD hh:mm:ss"),nuevoestadoelv,idElectrovalvula);

  //Inserto el nuevo riego en la base de datos
  this.rServ.setRiegoByElectrovalvulaId(r).then(result=>{
    this.riego = r; 
    
    //Si se cierra la electrovalvula realizo un nuevo insert de una medicion
    if (this.riego.apertura == 0){
      //Creo un nuevo obejto medicion con la fecha y hora actual y con un nuevo valor creado aleatoriamente
      let m: Medicion = new Medicion(99,moment().format("YYYY-MM-DD hh:mm:ss"),Math.trunc(Math.random()*100),this.dispositivo.dispositivoId);
      //Insterto la nueva medicion en la base de datos
      this.mServ.setMedicionByDispositivoId(m).then(result=>{
        this.medicion = m;
        //Actualizo el valor que se muestra en el instrumento del DOM
        this.valorObtenido = this.medicion.valor;
        if (this.myChart != null){
          this.myChart.update({series: [{
            name: 'kPA',
            data: [this.valorObtenido],
            tooltip: {
              valueSuffix: ' kPA'
            }
          }]});
       }
      });
    }
  });
  }
  
  //Funcion llamada en el DOM para generar el instrumento 
  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: "Tensiometro",
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}
