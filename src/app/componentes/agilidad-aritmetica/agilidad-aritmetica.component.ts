import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';

import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import { FirebaseService } from'../../servicios/firebase.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css'],
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  private subscription: Subscription;

  operadores = ['+', '-', '*'];
  esperando = true;

  ngOnInit() {}
  constructor(private fire: FirebaseService, private router: Router) {
    this.ocultarVerificar = true;
    this.Tiempo = 10;
    this.nuevoJuego = new JuegoAgilidad();
    console.info('Inicio agilidad');
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.nuevoJuego.numeroIngresado = 0;
    this.esperando = false;
    this.generarNumero();
    this.repetidor = setInterval(() => {
      this.Tiempo--;
      console.log('llego', this.Tiempo);
      if (this.Tiempo === 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.nuevoJuego.registrarJugada(this.nuevoJuego.gano, 0);
        this.fire.saveJuego(this.nuevoJuego);
        this.ocultarVerificar = true;
        this.Tiempo = 10;
        }
    }, 900);
  }

  verificar() {
    this.esperando = true;
    this.nuevoJuego.verificar();
    this.fire.saveJuego(this.nuevoJuego);
    if (this.nuevoJuego.gano)
    {
      clearInterval(this.repetidor);
      this.ocultarVerificar = true;
      this.limpiarTablero();
    }
  }

  limpiarTablero()
  {
    this.nuevoJuego.numeroIngresado = 0;
    this.nuevoJuego.operador = '';
    this.nuevoJuego.primerNumero = 0;
    this.nuevoJuego.segundoNumero = 0;
  }

  generarNumero() {
    this.nuevoJuego.operador = this.operadores[Math.floor((Math.random() * 3))];
    this.nuevoJuego.primerNumero = Math.floor((Math.random() * 100) + 1);
    this.nuevoJuego.segundoNumero = Math.floor((Math.random() * 100) + 1);

    console.log(this.nuevoJuego.operador);
    console.log(this.nuevoJuego.primerNumero);
    console.log(this.nuevoJuego.segundoNumero);

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
    console.log('Respuesta:' + this.nuevoJuego.respuesta);

  }
}
