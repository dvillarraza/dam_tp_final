import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http:HttpClient) { }


getMedicionByDispositivoId(paramDispoitivoId):Promise<Medicion>{
    return this._http.get("http://localhost:3000/api/medicion/"+paramDispoitivoId).toPromise().then((objeto:Medicion)=>{
        return objeto;
    }).catch((err)=>{
        console.log("Error en la lectura")
        return null;
    });
}

getMedicionesByDispositivoId(paramDispoitivoId):Promise<Medicion[]>{
    return this._http.get("http://localhost:3000/api/medicion/todas/"+paramDispoitivoId).toPromise().then((objeto:Medicion[])=>{
        return objeto;
    }).catch((err)=>{
        console.log("Error en la lectura")
        return null;
    });
}

setMedicionByDispositivoId(paramMedicion:Medicion){
  return this._http.post("http://localhost:3000/api/medicion/",
    {dispositivoId:paramMedicion.dispositivoId, fecha:paramMedicion.fecha, valor:paramMedicion.valor}).toPromise().then(result=>{
      return result;
    })
}


}
