import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
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
