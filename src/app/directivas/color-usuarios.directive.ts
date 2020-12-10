import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColorUsuarios]'
})
export class ColorUsuariosDirective {

  @Input() resultado: boolean;

  constructor(private element: ElementRef) { 
  }

  ngOnInit() {

    this.element.nativeElement.style.backgroundColor = this.resultado ? "lightgreen" : "lightyellow" ;
 
  }

}
