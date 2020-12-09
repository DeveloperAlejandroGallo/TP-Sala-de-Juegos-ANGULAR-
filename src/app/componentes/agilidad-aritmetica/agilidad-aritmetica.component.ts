import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';

import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import { FirebaseService } from'../../servicios/firebase.service';
import { JuegosService } from '../../servicios/juegos.service';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css'],
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  jugador: Jugador;
  usuario;
  private subscription: Subscription;

  operadores = ['+', '-', '*'];
  esperando = true;

  ngOnInit() {}
  constructor(private fire: FirebaseService, 
              private router: Router,
              private juegoServ: JuegosService,
              private jugadorServ: JugadoresService,
              public authService: AuthenticationService) {
    
    this.nuevoJuego = new JuegoAgilidad();
    this.obtenerJugador();

    this.ocultarVerificar = true;
    this.Tiempo = 10;

    console.info('Inicio agilidad');
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.nuevoJuego.numeroIngresado = 0;
    this.nuevoJuego.jugador = this.jugador;
    this.esperando = false;
    this.generarNumero();
    this.repetidor = setInterval(() => {
      this.Tiempo--;
      console.log('Contador: ', this.Tiempo);
      if (this.Tiempo === 0) {
        Swal.fire({
          title: 'Tiempo!!',
          text: `El tiempo ha finalizado. Ha perdido la partida. Luego de ${this.nuevoJuego.intentos} intentos.`,
          icon: 'warning'
        });
        this.nuevoJuego.registrarJugada(false, this.nuevoJuego.gano ? 1 : 0);
        // console.log('JUEGO:');
        // console.table(this.nuevoJuego);
        this.fire.saveJuego(this.nuevoJuego);
        this.juegoServ.crearJuego(this.nuevoJuego);
        this.limpiarTablero();  
        }
    }, 900);
  }



  verificar() {
    this.esperando = true;
    this.nuevoJuego.intentos++;
    // this.fire.saveJuego(this.nuevoJuego);
    // this.juegoServ.crearJuego(this.nuevoJuego);
    console.log(this.nuevoJuego.toJson());
    if (this.nuevoJuego.verificar())
    {
      Swal.fire({
        title: 'Éxito!!!',
        text: 'Usted ha adivinado el número!',
        icon: 'success'
      });
      this.fire.saveJuego(this.nuevoJuego);
      this.juegoServ.crearJuego(this.nuevoJuego);
      this.limpiarTablero();
    }
  }

  limpiarTablero()
  {
    clearInterval(this.repetidor);
    this.ocultarVerificar = true;
    this.esperando = false;
    this.nuevoJuego.numeroIngresado = 0;
    this.nuevoJuego.operador = '';
    this.nuevoJuego.primerNumero = 0;
    this.nuevoJuego.segundoNumero = 0;
    this.Tiempo = 10;
  }

  generarNumero() {
    this.nuevoJuego.operador = this.operadores[Math.floor((Math.random() * 3))];
    this.nuevoJuego.primerNumero = Math.floor((Math.random() * 100) + 1);
    this.nuevoJuego.segundoNumero = Math.floor((Math.random() * 100) + 1);
    this.nuevoJuego.intentos = 0;

    switch(this.nuevoJuego.operador)
    {
      case '+':
        this.nuevoJuego.respuesta = this.nuevoJuego.primerNumero + this.nuevoJuego.segundoNumero;
        break;
      case '-':
        this.nuevoJuego.respuesta = this.nuevoJuego.primerNumero - this.nuevoJuego.segundoNumero;
        break;
      case '*':
        this.nuevoJuego.respuesta = this.nuevoJuego.primerNumero * this.nuevoJuego.segundoNumero;
        break;

    }
    console.log('Respuesta: ' + this.nuevoJuego.respuesta);

  }


  public obtenerJugador() {
    this.authService.currentUser().then(resp=>{
      this.usuario=resp;
      console.log('usuarioActivo ' + this.usuario.email);
    
      this.jugadorServ.getJugadorPorEmail(this.usuario.email).subscribe(ret => {
        this.jugador = ret;
        console.log('Usr: ');
        console.table(this.jugador);
      });
    });
  }

}
