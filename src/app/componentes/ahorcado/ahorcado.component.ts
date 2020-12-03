import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoAhorcado } from '../../clases/juego-ahorcado';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  constructor(private fire: FirebaseService, private router: Router) { }
  juegoActivo: boolean = false;
  nuevoJuego: JuegoAhorcado;
  palabraPantalla: Array<string>;
  letrasJugadas: Array<string>;
  mensaje: string;
  errores: number;

  ngOnInit(): void {
    
  }

  letraClick(char: string) {
    console.log('click:'+char);
    if (!this.letrasJugadas.includes(char)) {
      if (this.nuevoJuego.existeLetra(char.toUpperCase())) {
        this.mensaje = 'Buen trabajo!';
      } else {
        this.mensaje = ':( ser\u00E1 la pr\u00F3xima';
        this.cambiarImagen();
      }
      this.letrasJugadas.push(char);
    } else {
      this.mensaje = 'Esa letra ya fu\u00E9 jugada';
    }
    if (this.errores == 9)
    {
      this.mensaje = 'AH PERDIDO EL JUEGO...';
      this.nuevoJuego.gano = false;
      this.nuevoJuego.registrarJugada(false, 0);
      this.fire.saveJuego(this.nuevoJuego);
    } else {
      if (this.nuevoJuego.verificar()) {
        this.nuevoJuego.registrarJugada(true, 1);
        this.fire.saveJuego(this.nuevoJuego);
        this.mensaje = 'FELICITACIONES AH GANADO EL JUEGO!';
      }
    }
  }

  cambiarImagen() {
    const celda = document.getElementById('ahorcado') as unknown as any;
    
    celda.classList.remove('img' + this.errores.toString());
    this.errores++;
    celda.classList.add('img' + this.errores.toString());
  }

  nuevo() {
    this.nuevoJuego = new JuegoAhorcado();
    setInterval(() => {
     this.nuevoJuego.palabraMostradaString();
     this.nuevoJuego.verificar();
    },500);
    this.juegoActivo = true;
    this.errores = 0;
    this.letrasJugadas = new Array<string>();
  }
}
