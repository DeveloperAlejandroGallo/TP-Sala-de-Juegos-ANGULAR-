import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoAhorcado } from '../../clases/juego-ahorcado';
import { JuegosService } from '../../servicios/juegos.service';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  constructor(private fire: FirebaseService, private router: Router,private juegoServ: JuegosService) { }
  juegoActivo: boolean = false;
  nuevoJuego: JuegoAhorcado;
  palabraPantalla: Array<string>;
  letrasJugadas: Array<string>;
  mensaje: string;
  errores: number;
  primera: boolean;
  ngOnInit(): void {
    this.primera = true;
  }

  letraClick(char: string) {
    console.log('click:'+char);
    this.nuevoJuego.intentos++;
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
      Swal.fire({
        title: 'Cuidado!',
        text: this.mensaje,
        icon: 'info',
        timer: 1500
      });
    }
    if (this.errores == 8)
    {
      this.mensaje = 'AH PERDIDO EL JUEGO... \nLa palabra buscada era: ' +this.nuevoJuego.palabraBuscada;
      Swal.fire({
        title: 'Tristeza....',
        text: this.mensaje,
        icon: 'error',
      });
      this.nuevoJuego.registrarJugada(false, 0);
      this.fire.saveJuego(this.nuevoJuego);
      this.juegoServ.crearJuego(this.nuevoJuego);
    } else {
      if (this.nuevoJuego.verificar()) {
        this.nuevoJuego.registrarJugada(true, 8 - this.errores);
        this.fire.saveJuego(this.nuevoJuego);
        this.juegoServ.crearJuego(this.nuevoJuego);
        this.mensaje = 'AH GANADO EL JUEGO!';
        Swal.fire({
          title: 'FELICITACIONES!!!',
          text: this.mensaje,
          icon: 'success',
        });
      }
    }
  }

  cambiarImagen() {
    const celda = document.getElementById('ahorcado') as unknown as any;
    
    celda.classList.remove('img' + this.errores.toString());
    this.errores++;
    celda.classList.add('img' + this.errores.toString());
    Swal.fire({
      title: 'Cuidado!',
      text: 'Esa letra no va...\nQuedan ' + (8-this.errores).toString()+' equivocaciones posibles',
      icon: 'warning',
      timer: 2000
    });
  }

  nuevo() {
    this.nuevoJuego = new JuegoAhorcado();
    this.juegoActivo = true;
    if(!this.primera) {
      const celda = document.getElementById('ahorcado') as unknown as any;
      celda.classList.remove('img' + this.errores.toString());
      celda.classList.add('img0');
    }

    this.errores = 0;
    
    this.letrasJugadas = new Array<string>();
    this.primera = false;
    Swal.fire({
      title: 'A Jugar!',
      text: 'Posee 8 posibilidades de equivocación.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    });
    setInterval(() => {
     this.nuevoJuego.palabraMostradaString();
     this.nuevoJuego.verificar();
    },500);

  }
}
