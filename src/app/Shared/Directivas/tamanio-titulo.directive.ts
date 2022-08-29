import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTamanioTitulo]'
})
export class TamanioTituloDirective {

  constructor(private element: ElementRef,private render: Renderer2) { 
    render.setStyle(element.nativeElement,'font-size','20px');
    render.setStyle(element.nativeElement,'font-weight','bold');

  }

}
