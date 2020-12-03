import { Juego } from '../clases/juego';

export class JuegoAgilidad extends Juego {

  primerNumero = 0;
  segundoNumero = 0;
  operador = '';
  respuesta = 0;
  numeroIngresado = 0;

  
  constructor(nombre?: string, gano?: boolean, jugador?: string)
  {
    super('Agilidad', gano, sessionStorage.getItem('usuario'), 0);
  }

  public verificar() {

    this.gano = this.respuesta == this.numeroIngresado;
    this.registrarJugada(this.gano, 1);
    return this.gano;

    }

    //  public generarnumero() {

    //     this.gano = false;
    //   }

      public retornarAyuda() {

        return 'Que onda la ayuda?';
      }

}
