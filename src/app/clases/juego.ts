import { Time } from '@angular/common';
import { Jugador } from './jugador';
import { Usuario } from './usuario';

export abstract class Juego {
  public nombre = 'Sin Nombre';
  public gano = false;
  public usuario: string;
  public puntaje: number = 0;
  public intentos: number = 0;
  public fecha: Date;
  public jugador: Jugador;

  constructor(
    nombre?: string,
    gano?: boolean,
    usuario?: string,
    intentos?: number,
    puntaje?: number,
    fecha?: Date,
    jugador?: Jugador) {
    if (nombre) { this.nombre = nombre; }
    if (gano) { this.gano = gano; }
    if (usuario) { this.usuario = usuario.replace('""','"'); } else { this.usuario = sessionStorage.getItem('usuario').replace('""','"'); }
    if (intentos) { this.intentos = intentos; } else { this.intentos = 0; }
    if (fecha) { this.fecha = fecha; } else { Date.now(); }
    if (jugador) { this.jugador = jugador; } else { this.jugador = null }
    if (puntaje) { this.puntaje = puntaje; } else { this.puntaje = 0; }


  }

  getSession() {
    return this.usuario = sessionStorage.getItem('usuario').replace('""','"');
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

  public toJson() {
    return {
      "nombre": this.nombre,
      "gano": this.gano,
      "usuario": this.usuario,
      "puntaje": this.puntaje,
      "intentos": this.intentos,
      "fecha": this.fecha,
      "jugador": this.jugador
    }
  }

}
