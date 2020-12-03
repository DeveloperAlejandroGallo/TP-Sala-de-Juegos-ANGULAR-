import { Juego } from '../clases/juego';

export class JuegoAdivina extends Juego
{
    numeroSecreto = 0;
    numeroIngresado = 0;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('Adivina el n\u00FAmero', gano, sessionStorage.getItem('usuario'), 0);
      }

    public verificar() {
       
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
        }
        this.registrarJugada(this.gano, this.gano ? 1 : 0);
        return this.gano;
     }

     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
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
