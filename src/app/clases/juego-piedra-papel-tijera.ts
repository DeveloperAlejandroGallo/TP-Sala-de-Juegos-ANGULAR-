import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego {

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('PiedraPapelTijera', gano, jugador);
      }

    public verificar(): boolean {
        throw new Error('Metodo PiedraPapelTijera verificar no implementado');
    }
}
