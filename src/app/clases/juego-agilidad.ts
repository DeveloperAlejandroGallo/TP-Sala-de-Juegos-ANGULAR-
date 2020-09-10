import { Juego } from '../clases/juego';

export class JuegoAgilidad extends Juego {

  numeroSecreto = 0;
  numeroIngresado = 0;
  
  constructor(nombre?: string, gano?: boolean, jugador?: string)
  {
    super('Agilidad', gano, jugador);
  }

  public verificar() {

    this.gano = true;

    return true;


    }

     public generarnumero() {

        this.gano = false;
      }

      public retornarAyuda() {

        return 'Que onda la ayuda?';
      }

}
