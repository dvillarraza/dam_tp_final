import { Injectable } from '@angular/core';
import { Riego } from '../model/Riego';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  constructor(private _http:HttpClient) { }

  //Obtengo el riego mas reciente de la electrovalvula con electrovalvulaId=paramElectrovalvulaId
  getRiegoByElectrovalvulaId(paramElectrovalvulaId):Promise<Riego>{
      return this._http.get("http://localhost:3000/api/riego/"+paramElectrovalvulaId).toPromise().then((objeto:Riego)=>{
          return objeto;
      }).catch((err)=>{
          console.log("Error en la lectura")
          return null;
      });
  }
  
  //Obtengo todos los riegos de la electrovalvula con electrovalvulaId=paramElectrovalvulaId
  getRiegosByElectrovalvulaId(paramElectrovalvulaId):Promise<Riego[]>{
      return this._http.get("http://localhost:3000/api/riego/todos/"+paramElectrovalvulaId).toPromise().then((objeto:Riego[])=>{
          return objeto;
      }).catch((err)=>{
          console.log("Error en la lectura")
          return null;
      });
  }

  //Insterto un nuevo riego
  setRiegoByElectrovalvulaId(paramElectrovalvula:Riego){
    return this._http.post("http://localhost:3000/api/riego/",
      {electrovalvulaId:paramElectrovalvula.electrovalvulaId, fecha:paramElectrovalvula.fecha, apertura:paramElectrovalvula.apertura}).toPromise().then(result=>{
        return result;
      })
  }

}
