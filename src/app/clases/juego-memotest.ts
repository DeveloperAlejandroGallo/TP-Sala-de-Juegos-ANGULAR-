import { doesNotMatch } from 'assert';
import { Juego } from './juego';
import { Jugador } from './jugador';

export class JuegoMemotest extends Juego {

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('Memotest', gano, sessionStorage.getItem('usuario'), 0);
        this.inicializar();
        this.llenarTablero();
       }

    elementos: Array<string>; 

    HUMANO = 1;
    MAQUINA = 2;
    mensaje: string;
    puntajePC = 0;
    puntajeJugador = 0;
    // elementos que acerto descubrir
    jugadasHumano: Array<string>;
    jugadasMaquina: Array<string>;
    tablero2: Array<{elem: string, descubierto: boolean}>;
    ganador = true;
    perdedor = false;


    inicializar() {
        let i: number;

        this.tablero2 = new Array<{elem: string, descubierto: boolean}>();
        for (i = 0; i < 25; i++) {
            this.tablero2[i] = {elem: '', descubierto: false};
            if (i == 12) {
                this.tablero2[i] = {elem: 'centro', descubierto: true};
            }
        }

        this.elementos = new Array<string>();
        this.elementos = ['auriculares', 'bandera', 'caballo', 'calculadora', 'casa', 'corazon',
        'disco', 'escudo', 'gota', 'pin', 'premio', 'vinoculares'];

        this.puntajePC = 0;
        this.puntajeJugador = 0;

        this.jugadasHumano = new Array<string>();
        this.jugadasMaquina  = new Array<string>();
    }

    llenarTablero() {

        while (this.elementos.length !== 0) {
            let indiceElemento: number;
            let libres: Array<number>;
            let unoAlAzar: number;
            let elemento: string;

            indiceElemento = Math.floor(Math.random() * this.elementos.length);
            elemento = this.elementos[indiceElemento]; // Elijo un elemento

            libres = this.esVacia(); // this.esVacia2();
            unoAlAzar = libres[Math.floor(Math.random() * libres.length)];
            // this.tablero[unoAlAzar] = elemento;
            this.tablero2[unoAlAzar] = {elem: elemento, descubierto: false};

            libres = this.esVacia(); // this.esVacia2();
            unoAlAzar = libres[Math.floor(Math.random() * libres.length)];
            // this.tablero[unoAlAzar] = elemento;
            this.tablero2[unoAlAzar] = {elem: elemento, descubierto: false};

            // this.elementos = this.elementos.splice(indiceElemento, 1); // se lo saco
            this.elementos = this.elementos.filter(elem => elem !== elemento);
        }

    }


    esVacia(): Array<number> {
        let i: number;
        const res = new Array<number>();

        for (i = 0; i < this.tablero2.length; i++) {
            if (this.tablero2[i].elem === '') {
                res.push(i);
            }
        }
        return res;
    }

    public verificar(): boolean {
        this.gano = false;
        if (this.jugadasHumano.length > this.jugadasMaquina.length) {
            this.mensaje = 'Ganaste!';
            this.registrarJugada(this.ganador, this.puntajeJugador);
        } else {
            if (this.jugadasHumano.length < this.jugadasMaquina.length) {
                this.mensaje = 'Perdiste!';
                this.registrarJugada(this.perdedor, this.puntajeJugador);
            } else {
                this.mensaje = 'Empate!';
            }
        }

        return this.gano;
    }

    coincidencia(uno: number, dos: number, jugador: number): boolean {
        if (this.tablero2[uno].elem == this.tablero2[dos].elem) {
            this.tablero2[uno].descubierto = true;
            this.tablero2[dos].descubierto = true;
            console.log(`jugador: ${jugador} Humano: ${this.HUMANO} - PC: ${this.MAQUINA}`);
            if (jugador == this.HUMANO) {
                this.jugadasHumano.push(this.tablero2[uno].elem);
                this.puntajeJugador++;
            } 
            if (jugador == this.MAQUINA) {
                this.jugadasMaquina.push(this.tablero2[uno].elem);
                this.puntajePC++;
            }
            return true;
        }

        return false;
    }

    unaJugablesAlAzar(): number {
        let i: number;
        let libres = new Array<number>();

        for (i = 0; i < this.tablero2.length; i++) {
            if (!this.tablero2[i].descubierto) {
                libres.push(i);
            }
        }
        return libres[Math.floor(Math.random() * libres.length)];

    }

    QuedanLibres() {
        let filter: Array<any>;
        filter = this.tablero2.filter(elem => elem.descubierto );
        return filter.length !== 0;
    }
}
