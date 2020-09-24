import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  nuevoJuego: JuegoPiedraPapelTijera;
  iniciarJuego: boolean;

  constructor() {
    this.iniciarJuego = false;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
   }

   public choise_click(what: number)
   {
    this.nuevoJuego.playerOption = what;
    this.nuevoJuego.verificar();
    console.log('YO:' + this.nuevoJuego.options[this.nuevoJuego.playerOption]);
    console.log('PC:' + this.nuevoJuego.options[this.nuevoJuego.optionPC]);
    console.log('Resultado:' + this.nuevoJuego.mensaje);
    console.log('Ganador: ' + this.nuevoJuego.gano);
    
   }

   nuevo() {
    this.iniciarJuego = true;
    this.nuevoJuego.puntajePC = 0;
    this.nuevoJuego.puntajeJugador = 0;
    
   }

  ngOnInit(): void {
  }


}
