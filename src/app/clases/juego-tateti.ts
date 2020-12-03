import { Juego } from './juego';
import { Jugador } from './jugador';


export class JuegoTateti extends Juego {
// tslint:disable-next-line: curly
    constructor(nombre?: string, gano?: boolean, jugador?: string, intentos?: number) {
        super('Ta Te Ti', gano, sessionStorage.getItem('usuario'), 0);
      }

      // 0 es no asignado, 1 jugador humano, 2 jugador maquina
    tateti = [[0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]];

    HUMANO: 1;
    MAQUINA: 2;
    mensaje: string;
    puntajePC = 0;
    puntajeJugador = 0;
    ganador = true;
    perdedor = false;

    jugadaMaquina(): [number, number]
    {
        const libres = this.celdasLibres();
        return libres[Math.floor(Math.random() * libres.length)];
    }

    celdasLibres(): Array<[number, number]> {
        let fila: number;
        let col: number;
        let libres: Array<[number, number]>;
        libres = new Array<[number, number]>();

        for ( fila = 0; fila < 3; fila++) {
            for (col = 0; col < 3; col++) {
                 if (this.tateti[fila][col] == 0) {
                    libres.push([fila, col]);
                 }
            }
        }

        return libres;
    }


    esGanador(jugador: number): boolean {
        let ret = false;

        if (// 3 en linea
            this.tresEnLinea(jugador, 'fila') ||
            // 3 en columna
            this.tresEnLinea(jugador, 'columna') ||
            // diagonal
            this.diagonales(jugador))
            {
                console.log('sale true');
                ret = true;
                if (jugador === this.HUMANO) {
                    this.registrarJugada(this.ganador, 1);
                    
                } else {
                    this.registrarJugada(this.perdedor, 0);
                }
            }


        return ret;
    }

    tresEnLinea(jugador: number, orientacion: string): boolean
    {
        let
        suma = 0,
        i: number,
        j: number;
        for (i = 0; i < 3; i++) {
            suma = 0;
            for (j = 0; j < 3; j++)
            {
                if (orientacion == 'fila' && this.tateti[i][j] == jugador ||
                    orientacion == 'columna' && this.tateti[j][i] == jugador ) {
                    suma += jugador;
                }
                if (orientacion == 'fila') {
                    console.log(`Jugador ${jugador}, leyendo ${orientacion} ${i}-${j}  suma: ${suma}`);
                }
                else { 
                    console.log(`Jugador ${jugador}, leyendo ${orientacion} ${j}-${i}  suma: ${suma}`);
                }
            }
            if (suma == (jugador * 3))
            {
                return true;
            }
        }
        return false;
    }

    diagonales(jugador: number): boolean {
        return ((this.tateti[0][0] == jugador &&
                 this.tateti[1][1] == jugador &&
                 this.tateti[2][2] == jugador) ||
                (this.tateti[2][0] == jugador &&
                 this.tateti[1][1] == jugador &&
                 this.tateti[0][2] == jugador));
    }

    public verificar(): boolean {

        return this.gano;
    }





}
