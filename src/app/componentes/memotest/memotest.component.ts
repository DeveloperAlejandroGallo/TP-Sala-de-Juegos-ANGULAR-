import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoMemotest } from '../../clases/juego-memotest';
import { JuegosService } from '../../servicios/juegos.service';
import { JugadoresService } from '../../servicios/jugadores.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import { Jugador } from '../../clases/jugador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  constructor(private fire: FirebaseService, private router: Router, private juegoServ: JuegosService,
    private jugadorServ: JugadoresService,
    public authService: AuthenticationService) {
      this.obtenerJugador();
     }

  nuevoJuego: JuegoMemotest;
  mensaje: string;
  iniciarJuego: boolean;
  jugadasRestantes: number;
  primeraEleccion: number;
  segundaEleccion: number;
  HUMANO = 1;
  MAQUINA = 2;
  jugador: Jugador;
  usuario;


  ngOnInit(): void {
    
  }

  nuevo() {
    if(this.nuevoJuego)
      this.limpiarTablero();
    this.nuevoJuego = new JuegoMemotest();
    this.jugadasRestantes = 2;
    this.iniciarJuego = true;
    this.nuevoJuego.inicializar();
    this.nuevoJuego.llenarTablero();
    this.mensaje = '';
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
          this.nuevoJuego.intentos++;
          if (this.nuevoJuego.coincidencia(this.primeraEleccion, this.segundaEleccion, this.HUMANO)) {
            this.mensaje = 'Excelente Memoria\nContinúe...';
            if (!this.nuevoJuego.QuedanLibres()) {
              this.nuevoJuego.verificar();
              this.nuevoJuego.registrarJugada(this.nuevoJuego.gano, this.nuevoJuego.puntajeJugador);
              this.fire.saveJuego(this.nuevoJuego);
              this.juegoServ.crearJuego(this.nuevoJuego);
              this.mensaje = 'FIN DEL JUEGO\n' + this.nuevoJuego.mensaje;
              Swal.fire({
                title: 'FIN DEL JUEGO!',
                text: this.nuevoJuego.mensaje,
                icon: this.nuevoJuego.gano ? 'success' : 'error'
              })
              return;
            } else
              this.jugadasRestantes = 2;
          } else {
            this.mensaje = 'A seguir intentando';
            setTimeout(() => {
              this.limpiarCelda(this.primeraEleccion);
              this.limpiarCelda(this.segundaEleccion);
            }, 1200);
          }
          if (this.jugadasRestantes == 0) {
            if (this.nuevoJuego.QuedanLibres()) {
              this.mensaje += ' - Mi Turno.';
              setTimeout(() => {
                this.jugadaMaquina();
                console.log('Ya jugó la Maquina');
                if (this.nuevoJuego.QuedanLibres()) {
                  this.mensaje = 'Su Turno';
                } else {
                  console.log('Registrar Jugada luego de que juega la Maquina');
                  this.nuevoJuego.verificar();
                  this.nuevoJuego.registrarJugada(this.nuevoJuego.gano, this.nuevoJuego.puntajeJugador);
                  this.fire.saveJuego(this.nuevoJuego);
                  this.juegoServ.crearJuego(this.nuevoJuego);
                  this.mensaje = 'FIN DEL JUEGO\n' + this.nuevoJuego.mensaje;
                  Swal.fire({
                    title: 'FIN DEL JUEGO!',
                    text: this.nuevoJuego.mensaje,
                    icon: this.nuevoJuego.gano ? 'success' : 'error'
                  });
                }
              }, 1200);

            } else {
              this.nuevoJuego.verificar();
              this.nuevoJuego.registrarJugada(this.nuevoJuego.gano, this.nuevoJuego.puntajeJugador);
              this.fire.saveJuego(this.nuevoJuego);
              this.juegoServ.crearJuego(this.nuevoJuego);
              this.mensaje = 'FIN DEL JUEGO\n' + this.nuevoJuego.mensaje;
              Swal.fire({
                title: 'FIN DEL JUEGO!',
                text: this.nuevoJuego.mensaje,
                icon: this.nuevoJuego.gano ? 'success' : 'error'
              });
            }
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
    console.log('inicio jugada maquina');
    uno = this.nuevoJuego.unaJugablesAlAzar();
    this.nuevoJuego.tablero2[uno].descubierto = true;
    dos = this.nuevoJuego.unaJugablesAlAzar();
    this.nuevoJuego.tablero2[uno].descubierto = false;
    this.darVueltaImagen(uno);
    setTimeout(() => {
      this.darVueltaImagen(dos);
      if (this.nuevoJuego.coincidencia(uno, dos, this.MAQUINA)) {
        this.mensaje = 'Estoy de suerte!';
        if (this.nuevoJuego.QuedanLibres()) {
          console.log('Juega de nuevo la maquina');
          this.jugadaMaquina();
        } 
        else { 
          console.log('Registrar Jugada luego de que juega la Maquina');
          this.nuevoJuego.verificar();
          this.nuevoJuego.registrarJugada(this.nuevoJuego.gano, this.nuevoJuego.puntajeJugador);
          this.fire.saveJuego(this.nuevoJuego);
          this.juegoServ.crearJuego(this.nuevoJuego);
          this.mensaje = 'FIN DEL JUEGO\n' + this.nuevoJuego.mensaje;
          Swal.fire({
            title: 'FIN DEL JUEGO!',
            text: this.nuevoJuego.mensaje,
            icon: this.nuevoJuego.gano ? 'success' : 'error'
          });
        }
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
    // console.log(celda);

    celda.classList.remove('incognita');
    celda.classList.add(elem);
  }

  limpiarCelda(i: number) {
    const celda = document.getElementById('celda' + i.toString()) as unknown as any;
    const elem = this.nuevoJuego.tablero2[i].elem;
    // console.log(celda);
    // console.log(i +':'+ elem);
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

  public obtenerJugador() {
    this.authService.currentUser().then(resp=>{
      this.usuario=resp;
      console.log('usuarioActivo ' + this.usuario.email);
    
      this.jugador = this.fire.getJugadorByEmail(this.usuario.email);
    });
  }



}
