
import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import { FirebaseService } from '../../servicios/firebase.service'; 
import { JuegoAdivina } from '../../clases/juego-adivina';
import { JuegosService } from '../../servicios/juegos.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  usuario;
  jugador: Jugador;

  constructor(private fire: FirebaseService, 
              private router: Router,
              private juegoServ: JuegosService,
              private authService: AuthenticationService) {
    this.nuevoJuego = new JuegoAdivina();
    console.info('numero Secreto:', this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
    this.obtenerJugador();
  }


  public obtenerJugador() {
    this.authService.currentUser().then(resp=>{
      this.usuario=resp;
      console.log('usuarioActivo ' + this.usuario.email);
    
      this.jugador = this.fire.getJugadorByEmail(this.usuario.email);
    });
  }


  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
    // this.nuevoJuego.jugador = this.jugador;
  }
  verificar() {
    this.contador++;
    this.nuevoJuego.intentos++;
    this.ocultarVerificar = true;
    console.info('Numero Secreto - Gano:', this.nuevoJuego.gano);
    
    // console.info('Verificar resultado: ', this.nuevoJuego.verificar());
    if (this.nuevoJuego.verificar())
    {
      this.fire.saveJuego(this.nuevoJuego);
      this.juegoServ.crearJuego(this.nuevoJuego);
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje('Feicitaciones Adivinaste el Número!', true);
      this.nuevoJuego.numeroSecreto = 0;
      this.nuevoJuego.intentos = 0;

    } else {

      let mensaje: string;
      switch (this.nuevoJuego.intentos) {
        case 1:
          mensaje ='No, intento fallido, animo';
          break;
          case 2:
          mensaje ='No,Te estaras Acercando???';
          break;
          case 3:
          mensaje ='No es, Yo crei que la tercera era la vencida.';
          break;
          case 4:
          mensaje ='No era el  '+ this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje =' intentos y nada.';
          break;
          case 6:
          mensaje ='Afortunado en el amor';
          break;

        default:
            mensaje ='Ya le erraste '+ this.nuevoJuego.intentos +' veces';
          break;
      }
      this.MostarMensaje('#'+ this.nuevoJuego.intentos+' '+ mensaje +' \nAyuda :'+ this.nuevoJuego.retornarAyuda());


    }
    console.info('numero Secreto:', this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string='este es el mensaje', ganador: boolean= false)
  {
    this.Mensajes = mensaje;
    let x = document.getElementById('snackbar');
    if (ganador) {
        x.className = 'show Ganador';
      } else {
        x.className = 'show Perdedor';
      }
    let modelo = this;
    setTimeout(function() {
      x.className = x.className.replace('show', '');
      modelo.ocultarVerificar = false;
     }, 1500);
    console.info('objeto', x);

   }
  ngOnInit() {
  }

}
