import { Juego } from '../clases/juego';

export class JuegoAgilidad extends Juego {

  primerNumero = 0;
  segundoNumero = 0;
  operador = '';
  respuesta = 0;
  numeroIngresado = 0;


  
  constructor(nombre?: string, gano?: boolean, jugador?: string)
  {
    super('Agilidad Aritmetica', gano, sessionStorage.getItem('usuario').replace('""','"'), 0);
  }


  public toJson() {
    return {
      "nombre": this.nombre,
      "gano": this.gano,
      "usuario": this.usuario,
      "puntaje": this.puntaje,
      "intentos": this.intentos,
      "fecha": this.fecha,
      // "jugador": this.jugador,
      "primerNumero": this.primerNumero,
      'operador': this.operador,
      "segundoNumero": this.segundoNumero,
      "respuestaCorrecta": this.respuesta,
      "respuestaJugador": this.numeroIngresado
    }
  }


  public verificar() {

    this.gano = this.respuesta == this.numeroIngresado;
    this.registrarJugada(this.gano, this.gano ? (this.intentos == 1 ? 5 : 1) : 0);
    return this.gano;

    }

    //  public generarnumero() {

    //     this.gano = false;
    //   }

      public retornarAyuda() {

        return 'Que onda la ayuda?';
      }

}
