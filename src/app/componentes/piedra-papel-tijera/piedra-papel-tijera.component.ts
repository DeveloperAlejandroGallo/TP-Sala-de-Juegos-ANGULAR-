import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  nuevoJuego: JuegoPiedraPapelTijera;
  iniciarJuego: boolean;
  resultado: string;
  jugado: boolean;

  constructor(private fire: FirebaseService, private router: Router) {
    this.iniciarJuego = false;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }
  ngOnInit(): void {
  }

  public choise_click(what: number) {
    this.jugado = true;
    this.nuevoJuego.playerOption = what;
    let ret: boolean = this.nuevoJuego.verificar();
    this.fire.saveJuego(this.nuevoJuego);
    // this.juegoServ.crearJuego(this.nuevoJuego);
    this.resultado = `Jugaste: ${this.nuevoJuego.options[this.nuevoJuego.playerOption]}\n
                      PC: ${this.nuevoJuego.options[this.nuevoJuego.optionPC]}\n
                      Resultado: ${this.nuevoJuego.mensaje}`;
    console.log('YO:' + this.nuevoJuego.options[this.nuevoJuego.playerOption]);
    console.log('PC:' + this.nuevoJuego.options[this.nuevoJuego.optionPC]);
    console.log('Resultado:' + this.nuevoJuego.mensaje);
    console.log('Ganador: ' + this.nuevoJuego.gano);
    this.iniciarJuego = false;

  }

  nuevo() {
    this.iniciarJuego = true;
    this.nuevoJuego.puntajePC = 0;
    this.nuevoJuego.puntajeJugador = 0;
    this.jugado = false;
  }


}
