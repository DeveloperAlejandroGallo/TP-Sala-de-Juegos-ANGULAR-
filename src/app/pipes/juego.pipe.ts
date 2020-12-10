import { Pipe, PipeTransform } from '@angular/core';
import { Juego } from '../clases/juego';

@Pipe({
  name: 'juego'
})
export class JuegoPipe implements PipeTransform {

  transform(listaJuegos: Array<Juego>, ...args: string[]): Array<Juego> {
    
    let juego: string,
        email: string;

    let listaResultado = new Array<Juego>();

    if (args[0] == ('' || undefined))
      juego = '';
    else  
      juego = args[0] 

    if (args[1] == ('' || undefined))
      email = '';
    else  
      email = args[1] 

    listaResultado = listaJuegos;

    if(juego != '')
      listaResultado = listaResultado.filter(j => j.nombre.toLowerCase().indexOf(juego.toLowerCase()) > -1);
    
    if(email != '') 
      listaResultado = listaResultado.filter(j => j.usuario.toLowerCase().indexOf(email.toLowerCase()) > -1);


    return listaResultado;
  }

}
