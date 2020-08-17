import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http:HttpClient) {  //Nos resuelve las llamadas al back-end
 
  }

getDispositivoById(paramId):Promise<Dispositivo>{
  //  return this.dispositivos.find(dispositivo => dispositivo.dispositivoId == paramId)
    return this._http.get("http://localhost:3000/api/dispositivo/"+paramId).toPromise().then((objeto:Dispositivo)=>{
        return objeto;
    }).catch((err)=>{
        console.log("Error en la lectura")
        return null;
    });
  }
  
getListado():Promise<Dispositivo[]>{
  return this._http.get("http://localhost:3000/api/dispositivo").toPromise().then((objeto:Dispositivo[])=>{
    return objeto;
  }).catch((err)=>{
      console.log("Error en la lectura")
      return []; //new Dispositivo(1,"","",0);
  });
//  return this.dispositivos.find(dispositivo => dispositivo.dispositivoId == paramId)
}

}

