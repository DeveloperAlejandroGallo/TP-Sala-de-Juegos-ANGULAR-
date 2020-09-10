import { Juego } from './juego';

export class JuegoAnagrama extends Juego {

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('Anagrama', gano, jugador);
      }

    public verificar(): boolean {
        throw new Error('Method JuegoAnagrama no implementado.');
    }

}
