import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../clases/juego-tateti';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  nuevoJuego: JuegoTateti;
  iniciarJuego: boolean;
  HUMANO = 1;
  MAQUINA = 2;
  mensaje: string;
  eleccionHumano: string;

  constructor() {
    this.iniciarJuego = false;
    this.nuevoJuego = new JuegoTateti();
   }

  ngOnInit(): void {
    this.mensaje = 'Su Turno (X)';
  }

  nuevo() {
    this.iniciarJuego = true;
    this.limpiarTablero();
    this.nuevoJuego.puntajePC = 0;
    this.nuevoJuego.puntajeJugador = 0;
  }

  limpiarTablero() {
    this.iniciarJuego = true;
    this.nuevoJuego.tateti = [[0, 0, 0],
                              [0, 0, 0],
                              [0, 0, 0]];
  this.limpiarCeldas();
  this.mensaje = 'Su Turno (X)';
  }

  jugadaHumano(i: number, j: number) {
    console.log(`Presiono ${i}-${j} `);
    // console.table(this.nuevoJuego.tateti);
    if (this.nuevoJuego.tateti[i][j] == 0) {
        this.marcarCelda(i, j, this.HUMANO);
        if (this.nuevoJuego.esGanador(this.HUMANO)) {
            this.nuevoJuego.puntajeJugador++;
            this.mensaje = 'FELICITACIONES UD. HA GANADO!!!';
        } else {
            if (this.esEmpate()) {
              this.mensaje = 'EMPATE!\nPresione Limpiar Tablero para nueva partida.';
              return;
            }
            else {
              this.mensaje = 'Mi Turno (O)';
            }
          setTimeout(() =>
            {
              const celdas = this.nuevoJuego.jugadaMaquina();
              this.marcarCelda(celdas[0], celdas[1], this.MAQUINA);
              if (this.nuevoJuego.esGanador(this.MAQUINA)) {
                this.nuevoJuego.puntajePC++;
                this.mensaje = 'UD. HA PERDIDO ESTA PARTIDA :(';
              } else {
                  if (this.esEmpate()) {
                    this.mensaje = 'EMPATE!\nPresione Limpiar Tablero para nueva partida.';
                    return;
                  } else {
                    this.mensaje = 'Su Turno (X)';
                  }
                
                }
            }, 1500);
        }


    } else {
    this.mensaje = 'Posici\u00F3n ocupada';
   }
    console.log(this.mensaje);
  }

  limpiarCeldas() {
    let i: number;
    let j: number;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        const celda = document.getElementById('celda' + i.toString() + j.toString()) as unknown as any;
        celda.innerHTML  = '-';
      }
    }

  }

  esEmpate(): boolean
  {
    let i: number;
    let j: number;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (this.nuevoJuego.tateti[i][j] == 0)
          return false;
      }
    }
    return true;
  }

  marcarCelda(i: number, j: number, jugador: number) {
    let celda = document.getElementById('celda' + i.toString() + j.toString()) as unknown as any;

    console.log(celda);

    this.nuevoJuego.tateti[i][j] = jugador;
    if (jugador == this.HUMANO) {
        celda.innerHTML  = 'X';
        // celda.classList.add('cruz');
    } else {
        celda.innerHTML  = 'O';
        // celda.classList.add('circulo');
      }
  }
}
