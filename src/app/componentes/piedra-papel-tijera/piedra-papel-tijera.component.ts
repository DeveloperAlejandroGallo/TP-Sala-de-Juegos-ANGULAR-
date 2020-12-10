import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { AuthenticationService } from '../../servicios/authentication.service';
import { Jugador } from '../../clases/jugador';
import Swal from 'sweetalert2';

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
  usuario;
  jugador = new Jugador();

  constructor(private fire: FirebaseService, private router: Router,
    private authService: AuthenticationService) {
    this.iniciarJuego = false;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    // this.obtenerJugador();
  }
  ngOnInit(): void {
  }

  // public obtenerJugador() {
  //   this.authService.currentUser().then(resp=>{
  //     this.usuario=resp;
  //     console.log('usuarioActivo ' + this.usuario.email);
  //     this.fire.getJugadores().subscribe((jugadores: Array<Jugador>)=> {
  //       this.jugador = jugadores.find(j=>j.email == this.nuevoJuego.usuario);
  //     });
  //   });
  // }


  public choise_click(what: number) {
    this.jugado = true;
    this.nuevoJuego.playerOption = what;
    let ret: boolean = this.nuevoJuego.verificar();
    this.fire.saveJuego(this.nuevoJuego);
    // this.juegoServ.crearJuego(this.nuevoJuego);
    this.resultado = `Jugaste: ${this.nuevoJuego.options[this.nuevoJuego.playerOption]}\n
                      PC: ${this.nuevoJuego.options[this.nuevoJuego.optionPC]}\n
                      Resultado: ${this.nuevoJuego.mensaje}`;
    Swal.fire({
      title: this.nuevoJuego.mensaje,
      text: 'Jugaste: '+this.nuevoJuego.options[this.nuevoJuego.playerOption] + ' <===> PC: ' +this.nuevoJuego.options[this.nuevoJuego.optionPC] ,
      icon: this.nuevoJuego.gano ? 'success' : (this.nuevoJuego.mensaje == 'Empate!' ? 'warning' : 'error')
    });                  
    console.log('YO:' + this.nuevoJuego.options[this.nuevoJuego.playerOption]);
    console.log('PC:' + this.nuevoJuego.options[this.nuevoJuego.optionPC]);
    console.log('Resultado:' + this.nuevoJuego.mensaje);
    console.log('Ganador: ' + this.nuevoJuego.gano);
    this.iniciarJuego = false;

  }

  nuevo() {
    console.table(this.jugador);
    this.iniciarJuego = true;
    this.nuevoJuego.puntajePC = 0;
    this.nuevoJuego.puntajeJugador = 0;
    // this.nuevoJuego.jugador = this.jugador;
    this.jugado = false;
  }


}
