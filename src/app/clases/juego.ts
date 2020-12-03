import { Usuario } from './usuario';

export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;
  public puntaje: number;
  public intentos: number;
  public fecha: Date;
  
  constructor(nombre?: string, gano?: boolean, jugador?: string, intentos?:number) {
    if (nombre) { this.nombre = nombre;}
    if (gano) {this.gano = gano;}
    if (jugador) {this.jugador = jugador;} else {this.jugador = 'Anonimus';}
    if (intentos) {this.intentos = intentos;} else {this.intentos = 0;}
    if (jugador) {this.jugador = jugador;} else {this.jugador = sessionStorage.getItem('usuario')} 


  }

  getSession() {
    return this.jugador = sessionStorage.getItem('usuario');
  }

  // saveGame()

  public abstract verificar(): boolean;

  public retornarAyuda() {

    return 'NO hay Ayuda definida';
  }

  public registrarJugada(resultado: boolean, puntaje: number) {
    this.gano = resultado;
    this.fecha = new Date();
    this.puntaje = puntaje;
    console.info(`Por salvar el juego ${this}`);
  }

}
