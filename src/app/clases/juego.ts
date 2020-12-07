import { Time } from '@angular/common';
import { Jugador } from './jugador';
import { Usuario } from './usuario';

export abstract class Juego {
  public nombre = 'Sin Nombre';
  public usuario: string;
  public gano = false;
  public puntaje: number;
  public intentos: number;
  public fecha: Date;
  public tiempo: Date;
  public jugador: Jugador;
  
  constructor(nombre?: string, gano?: boolean, usuario?: string, intentos?:number, fecha?:Date, tiempo?: Date, jugador?: Jugador) {
    if (nombre) { this.nombre = nombre;}
    if (gano) {this.gano = gano;}
    if (usuario) {this.usuario = usuario;} else {this.usuario = sessionStorage.getItem('usuario');}
    if (intentos) {this.intentos = intentos;} else {this.intentos = 0;}
    if (fecha) {this.fecha = fecha;} else {Date.now();}
    if (jugador) {this.jugador = jugador;} else {this.jugador = null} 


  }

  getSession() {
    return this.usuario = sessionStorage.getItem('usuario');
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
