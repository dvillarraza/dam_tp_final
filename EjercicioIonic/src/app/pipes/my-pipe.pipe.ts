import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})

//Pipe que modifica la vista 
  //Si el valor = 0 -> Muestra el contenido de estados[0]
  //Si el valor = 1 -> muestra el contenido de estados[1] 

export class MyPipePipe implements PipeTransform {

  transform(value: number, estados: string[]): string {
    let resultado:string = "";

    if (value == 0) {
      resultado = estados[0];
    }
    if (value == 1){
      resultado = estados[1];
    }
    return resultado;
  }

}
