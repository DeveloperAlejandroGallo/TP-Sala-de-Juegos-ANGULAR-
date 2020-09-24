import { NumericLiteral } from 'typescript';
import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego {

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('PiedraPapelTijera', gano, jugador);
      }

    options: string[] = ['Piedra', 'Papel', 'Tijera'];
    playerOption: number;
    optionPC: number;
    mensaje: string;
    puntajePC: number = 0;
    puntajeJugador: number = 0;

    public verificar(): boolean {
        let result = false;
        this.mensaje = 'Perdiste!';

        this.optionPC = Math.floor(Math.random() * 3);
        if (this.optionPC == this.playerOption ) {
            this.mensaje = 'Empate!';
        } else {
            if ((this.playerOption > this.optionPC) || (this.playerOption == 0 && this.optionPC == 2)) 
            {
                if (!(this.playerOption == 2 && this.optionPC == 0))
                {
                    this.mensaje = 'GANADOR!';
                    result = true;
                }
            }
        }
        this.gano =  result;

        if (this.mensaje == 'Empate!') {
            this.puntajeJugador++;
            this.puntajePC++;
        } else
            if (this.gano) {
                this.puntajeJugador++;
            } else {
                this.puntajePC++;
            }

        return result;
    }

    winner() {
        return Math.floor(Math.random() * 3);
    }


}
