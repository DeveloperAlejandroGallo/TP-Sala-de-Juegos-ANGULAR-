import { Juego } from '../clases/juego';

export class JuegoAdivina extends Juego
{
    numeroSecreto = 0;
    numeroIngresado = 0;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('Adivina el n\u00FAmero', gano, sessionStorage.getItem('usuario'), 0);
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
          "numeroSecreto": this.numeroSecreto,
          "respuestaJugador": this.numeroIngresado
        }
      }



    public verificar() {
       let puntaje: number = 0;
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
          puntaje = this.intentos == 1 ? 10 : 1
        }
        this.registrarJugada(this.gano, puntaje);
        return this.gano;
     }

     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        this.numeroIngresado = 0;
        console.info('numero Secreto:' + this.numeroSecreto);
        this.gano = false;
      }
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return 'Falta';
        }
        return 'Te pasate';
      }
}
