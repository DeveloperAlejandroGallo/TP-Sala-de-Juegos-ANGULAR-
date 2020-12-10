import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { JuegosService } from '../../servicios/juegos.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../servicios/authentication.service';
import { Jugador } from '../../clases/jugador';

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
  usuario;
  jugador: Jugador;

  constructor(private fire: FirebaseService, private router: Router,
    private juegoServ: JuegosService,
    private authService: AuthenticationService) { 
      this.obtenerJugador();
    }


  ngOnInit() {
    this.juegoActivo = false;
    this.nuevoJuego = new JuegoAnagrama();
  }

  public obtenerJugador() {
    this.authService.currentUser().then(resp=>{
      this.usuario=resp;
      console.log('usuarioActivo ' + this.usuario.email);
    
      this.jugador = this.fire.getJugadorByEmail(this.usuario.email);
    });
  }




  iniciarJuego()
  {
    this.juegoActivo = true;
    this.tiempo = 100;
    this.nuevoJuego.puntaje = 0;
    // this.nuevoJuego.jugador = this.jugador;
    this.nuevoJuego.seleccionarUno();
    console.log(`anagrama: ${this.nuevoJuego.anagrama} es ${this.nuevoJuego.respuestaCorrecta} ` );
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
    this.nuevoJuego.intentos++;
    this.nuevoJuego.verificar();

    if (this.nuevoJuego.gano)
    {
      this.mensaje = "Excelente!"
      Swal.fire({
        title: 'Excelente!',
        text: `${this.nuevoJuego.respuestaUsr.toUpperCase()} era la palabra buscada. Intente con la próxima.`,
        icon: 'success',
        timer: 1500
      });
      this.proximaPalabra();
    } else {
      Swal.fire({
        title: 'Error',
        text: `${this.nuevoJuego.respuestaUsr.toUpperCase()} no es la palabra que estamos buscando. Vuelva a intentarlo.`,
        icon: 'error',
        timer: 2000
      });
    }

  }

  proximaPalabra(){
    this.nuevoJuego.seleccionarUno();
    console.log(`anagrama: ${this.nuevoJuego.anagrama} es ${this.nuevoJuego.respuestaCorrecta} ` );
    this.nuevoJuego.respuestaUsr = '';
  }

  finDelJuego()
  {
    // this.juegoActivo = false;
    this.tiempo = 100;
    this.mensaje = `PUNTAJE: ${this.nuevoJuego.puntaje}`;
    Swal.fire({
      title: 'Fin de la Partida!',
      text: this.mensaje,
      icon: 'success',
    });
    this.nuevoJuego.registrarJugada(this.nuevoJuego.puntaje > 0, this.nuevoJuego.puntaje);
    this.fire.saveJuego(this.nuevoJuego);
    this.juegoServ.crearJuego(this.nuevoJuego);
    this.nuevoJuego.inicializar();
  }

}
