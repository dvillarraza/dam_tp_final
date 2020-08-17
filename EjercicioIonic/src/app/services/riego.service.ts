import { Injectable } from '@angular/core';
import { Riego } from '../model/Riego';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  constructor(private _http:HttpClient) { }

  getRiegoByElectrovalvulaId(paramElectrovalvulaId):Promise<Riego>{
    //  return this.dispositivos.find(dispositivo => dispositivo.dispositivoId == paramId)
      return this._http.get("http://localhost:3000/api/riego/"+paramElectrovalvulaId).toPromise().then((objeto:Riego)=>{
          return objeto;
      }).catch((err)=>{
          console.log("Error en la lectura")
          return null;
      });
  }
  
  getRiegosByElectrovalvulaId(paramElectrovalvulaId):Promise<Riego[]>{
    //  return this.dispositivos.find(dispositivo => dispositivo.dispositivoId == paramId)
      return this._http.get("http://localhost:3000/api/riego/todos/"+paramElectrovalvulaId).toPromise().then((objeto:Riego[])=>{
          return objeto;
      }).catch((err)=>{
          console.log("Error en la lectura")
          return null;
      });
  }
  
  setRiegoByElectrovalvulaId(paramElectrovalvula:Riego){
    return this._http.post("http://localhost:3000/api/riego/",
      {electrovalvulaId:paramElectrovalvula.electrovalvulaId, fecha:paramElectrovalvula.fecha, apertura:paramElectrovalvula.apertura}).toPromise().then(result=>{
        return result;
      })
  }

}
