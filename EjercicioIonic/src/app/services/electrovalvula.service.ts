import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {

  constructor(private _http:HttpClient) { }


  getElectrovalvulaById(paramId):Promise<Electrovalvula>{
    //  return this.dispositivos.find(dispositivo => dispositivo.dispositivoId == paramId)
      return this._http.get("http://localhost:3000/api/electrovalvula/"+paramId).toPromise().then((objeto:Electrovalvula)=>{
          return objeto;
      }).catch((err)=>{
          console.log("Error en la lectura")
          return null;
      });
    }
  /*  
  getListado():Promise<Electrovalvula[]>{
    return this._http.get("http://localhost:3000/api/electrovalvula").toPromise().then((objeto:Electrovalvula[])=>{
      return objeto;
    }).catch((err)=>{
        console.log("Error en la lectura")
        return []; //new Dispositivo(1,"","",0);
    });
  //  return this.dispositivos.find(dispositivo => dispositivo.dispositivoId == paramId)
  }*/

}
