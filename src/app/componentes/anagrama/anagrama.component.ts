import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { JuegosService } from '../../servicios/juegos.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  nuevoJuego: JuegoAnagrama;
  juegoActivo: boolean;
  repetidor:any;
  tiempo = 100;
  esperando = false;
  mensaje: string;

  constructor(private fire: FirebaseService, private router: Router,
    private juegoServ: JuegosService) { }

  ngOnInit() {
    this.juegoActivo = false;
    this.nuevoJuego = new JuegoAnagrama();
  }

  iniciarJuego()
  {
    this.juegoActivo = true;
    this.tiempo = 100;
    this.nuevoJuego.puntaje = 0;
    this.nuevoJuego.seleccionarUno();
    this.repetidor = setInterval(() => {
      this.tiempo--;
      // console.log('llego', this.tiempo);
      if (this.tiempo === 0) {
        clearInterval(this.repetidor);
        // this.verificar();
        this.finDelJuego();
      }
    }, 900);
  }

  verificar() {
    console.log(`anagrama: ${this.nuevoJuego.anagrama} es ${this.nuevoJuego.respuestaCorrecta} puso ${this.nuevoJuego.respuestaUsr}` );
    this.esperando = true;
    this.nuevoJuego.verificar();

    if (this.nuevoJuego.gano)
    {
      this.mensaje = "Excelente!"
    } else {
      this.mensaje = 'Vuelva a intentarlo';
    }
    this.nuevoJuego.registrarJugada(this.nuevoJuego.gano, 0);
    this.fire.saveJuego(this.nuevoJuego);
    this.juegoServ.crearJuego(this.nuevoJuego);
  }

  proximaPalabra(){
    this.nuevoJuego.seleccionarUno();
  }

  finDelJuego()
  {
    // this.juegoActivo = false;
    this.tiempo = 100;
    this.mensaje = `FIN DE LA PARTIDA\nPUNTAJE: ${this.nuevoJuego.puntaje}`;
    this.nuevoJuego.inicializar();
  }

}
