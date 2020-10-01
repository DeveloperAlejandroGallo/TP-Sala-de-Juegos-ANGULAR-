import { Component, OnInit } from '@angular/core';
import { JuegoMemotest } from '../../clases/juego-memotest';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  constructor() { }
  nuevoJuego: JuegoMemotest;
  mensaje: string;
  iniciarJuego: boolean;
  jugadasRestantes: number;
  primeraEleccion: number;
  segundaEleccion: number;
  HUMANO = 1;
  MAQUINA = 2;


  ngOnInit(): void {

  }

  nuevo() {
    this.nuevoJuego = new JuegoMemotest();
    this.jugadasRestantes = 2;
    this.iniciarJuego = true;
    this.nuevoJuego.inicializar();
    this.nuevoJuego.llenarTablero();
  }

  jugadaHumano(celda: number) {
    console.clear();
    if (this.jugadasRestantes > 0) {
      if (!this.nuevoJuego.tablero2[celda].descubierto) {
        this.darVueltaImagen(celda);
        if (this.jugadasRestantes == 2) {
          this.primeraEleccion = celda;
          this.mensaje = 'Elija otra celda';
          this.jugadasRestantes--;
        } else {
          this.segundaEleccion = celda;
          this.jugadasRestantes--;
          if (this.nuevoJuego.coincidencia(this.primeraEleccion, this.segundaEleccion, this.HUMANO)) {
            this.mensaje = 'Excelente Memoria\n';
          } else {
            this.mensaje = 'A seguir intentando';
            setTimeout(() => {
              this.limpiarCelda(this.primeraEleccion);
              this.limpiarCelda(this.segundaEleccion);
            }, 1200);
          }
          if (this.nuevoJuego.QuedanLibres()) {
            this.mensaje += ' - Mi Turno.';
            setTimeout(() => {
              this.jugadaMaquina();
              if ( this.nuevoJuego.QuedanLibres()) {
                this.mensaje = 'Su Turno';
              } else {
                this.nuevoJuego.verificar();
                this.mensaje = 'FIN DEL JUEGO\n' + this.nuevoJuego.mensaje;
              }
            }, 1200);

          } else {
            this.nuevoJuego.verificar();
            this.mensaje = 'FIN DEL JUEGO\n' + this.nuevoJuego.mensaje;
          }
        }
      } else {
        this.mensaje = 'Celda no disponible para jugar.';
      }
    } else {
      this.mensaje = 'No posee jugadas restantes.';
    }
    
    console.table(this.nuevoJuego.tablero2);
  }

  jugadaMaquina() {
    let uno: number;
    let dos: number;

    uno = this.nuevoJuego.unaJugablesAlAzar();
    this.nuevoJuego.tablero2[uno].descubierto = true;
    dos = this.nuevoJuego.unaJugablesAlAzar();
    this.nuevoJuego.tablero2[uno].descubierto = false;
    this.darVueltaImagen(uno);
    setTimeout(() => {
      this.darVueltaImagen(dos);
      if (this.nuevoJuego.coincidencia(uno, dos, this.MAQUINA)) {
        this.mensaje = 'Estoy de suerte!';
      } else {
        setTimeout(() => {
          this.limpiarCelda(uno);
          this.limpiarCelda(dos);
          this.jugadasRestantes = 2;
          this.mensaje = 'Su turno';
        }, 1200);
      }
    }, 1000);

  }

  darVueltaImagen(i: number) {
    const celda = document.getElementById('celda' + i.toString()) as unknown as any;
    const elem = this.nuevoJuego.tablero2[i].elem;
    console.log(celda);

    celda.classList.remove('incognita');
    celda.classList.add(elem);
  }

  limpiarCelda(i: number) {
    const celda = document.getElementById('celda' + i.toString()) as unknown as any;
    const elem = this.nuevoJuego.tablero2[i].elem;
    console.log(celda);

    celda.classList.remove(elem);
    celda.classList.add('incognita');

  }

  limpiarTablero() {
    for (let i = 0; i < 25; i++) {
      if (i !== 12) { // el centro
        this.limpiarCelda(i);
      }
    }
  }

}
