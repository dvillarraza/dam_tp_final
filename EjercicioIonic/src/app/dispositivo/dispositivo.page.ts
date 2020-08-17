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
     // console.log("Nombre del Dispositivo:" + this.dispositivo.dispositivoId);
      //this.NombreSensor = this.dispositivo.nombre;//disp[0].nombre;
     // console.log("El ID de la electro es:" + this.dispositivo.electrovalvulaId);
 
      this.mServ.getMedicionByDispositivoId(idDispositivo).then(med=>{
        if(med != null){
     //     console.log(med.valor);
          this.valorObtenido = Number(med.valor);
          } 
        else
          this.valorObtenido = 0;

        this.generarChart();

        this.eServ.getElectrovalvulaById(this.dispositivo.electrovalvulaId).then(elv=>{
          this.electrovalvula = elv[0];
       ///   console.log("El nombre de la electro es:" + this.electrovalvula.nombre);

          this.rServ.getRiegoByElectrovalvulaId(this.electrovalvula.electrovalvulaId).then(rg =>{
            if (this.riego != null)
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
    //opción 1- utilizar libreria Momentjs , haciendo npm install --save moment y luego el import * as moment from 'moment'; en donde lo necesitemos.
   
   //let a : Medicion= new Medicion(99,moment().format("YYYY-MM-DD hh:mm:ss"),99,1);

  //opción 2, utilizar el objeto Date y hacer el formato necesario a mano.
 // let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
  let nuevoestadoelv = 1; 
  
  if(this.riego != null){
    if(this.riego.apertura)
      nuevoestadoelv = 0;
    else
      nuevoestadoelv = 1;
  }

  let r : Riego= new Riego(99,moment().format("YYYY-MM-DD hh:mm:ss"),nuevoestadoelv,idElectrovalvula);

  this.rServ.setRiegoByElectrovalvulaId(r).then(result=>{
    this.riego = r;
   // console.log(result);
    
    //Si se cierra la electrovalvula realizo un nuevo insert de una medicion
    if (this.riego.apertura == 0){

      let m: Medicion = new Medicion(99,moment().format("YYYY-MM-DD hh:mm:ss"),Math.trunc(Math.random()*100),this.dispositivo.dispositivoId);

      this.mServ.setMedicionByDispositivoId(m).then(result=>{
      //  console.log(result);
        this.medicion = m;
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
          text: "Humedad de la Tierra"//this.dispositivo.nombre //'Sensor N° 1'
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
