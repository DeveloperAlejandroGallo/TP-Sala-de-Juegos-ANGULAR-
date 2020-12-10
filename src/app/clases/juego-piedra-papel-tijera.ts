import { NumericLiteral } from 'typescript';
import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego {

    constructor(nombre?: string, gano?: boolean, jugador?: string, intentos?: number) {
        super('Piedra Papel o Tijera', gano, sessionStorage.getItem('usuario'), 0);
      }

    options: string[] = ['Piedra', 'Papel', 'Tijera'];
    playerOption: number;
    optionPC: number;
    mensaje: string;
    puntajePC: number = 0;
    puntajeJugador: number = 0;

    public toJson() {
        return {
          "nombre": this.nombre,
          "gano": this.gano,
        "usuario": this.usuario,
          "puntaje": this.puntaje,
          "intentos": this.intentos,
          "fecha": this.fecha,
          // "jugador": this.jugador,
          "puntajePC": this.puntajePC,
          "opcionJugador": this.options[this.playerOption],
          "opcionPC": this.options[this.optionPC]
        }
      }


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

        
        if (this.mensaje == 'Empate!') {
            this.puntajeJugador++;
            this.puntajePC++;
        } else
            if (result) {
                this.puntajeJugador++;
            } else {
                this.puntajePC++;
            }
        this.registrarJugada(result, this.puntajeJugador);
        return result;
    }

    winner() {
        return Math.floor(Math.random() * 3);
    }


}
