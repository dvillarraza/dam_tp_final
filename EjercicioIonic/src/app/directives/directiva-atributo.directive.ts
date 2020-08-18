import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirectivaAtributo]'
})

//Directiva que cambuia el color de fondo cuando se pasa con el mouse sobre el elemento del DOM
export class DirectivaAtributoDirective {

  constructor(private el:ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.cambiar("blue","white");
  }

  @HostListener('mouseleave') OnMouseLeave(){
    console.log("leave");
    this.cambiar(null, null);
  }

  private cambiar(colorfondo:string, colortexto:string){
    this.el.nativeElement.style.backgroundColor = colorfondo;
    this.el.nativeElement.style.color = colortexto;
  }

}
