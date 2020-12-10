import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Juego } from '../../clases/juego';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  miJugadoresServicio:JugadoresService
  listaJugadores = new Array<Jugador>();
  listaJugadas =  new Array<Juego>();
  email: string;
  juego: string;  
  mostrar: string = 'todos';

    constructor(serviceJugadores:JugadoresService, private db : FirebaseService) {
      // this.miJugadoresServicio = serviceJugadores;
      this.listarJuegos();
      this.listarJugadas();
      this.listarJugadoresPorResultado('todos');
    }
    


  ngOnInit() {
  }

  listarJuegos(){
    this.db.getJugadores().subscribe(
      (lista: Array<Jugador>) => {
           this.listaJugadores = lista;
      }
    )}
  
  listarJugadas(){
        this.db.getJuegos().subscribe(
          (lista: Array<Juego>) => {
               this.listaJugadas = lista;
          }
        )}


    public cantidadDeJugadas(usuario: string):number {
      let cantidad: number = 0;
      switch(this.mostrar) {
        case 'todos': 
        cantidad = this.listaJugadas.filter(j => j.usuario == usuario).length;
        break;
        case 'ganadores': 
        cantidad = this.listaJugadas.filter(j => j.usuario == usuario && j.gano).length;
        break;
        case 'perdedores': 
        cantidad = this.listaJugadas.filter(j => j.usuario == usuario && !j.gano).length;
        break;
      }
      return cantidad;
    }


    public listarJugadoresPorResultado(que: string) {
      this.mostrar = que;

      // this.listaJugadores.forEach(jugador => {
      //   console.table(jugador);
      //   let player: {
      //     avatar: string, 
      //     nombre: string,
      //     apodo: string, 
      //     email: string,
      //     sexo: string,
      //     cantPartidas: number};
      //     player.avatar = jugador.avatar;
      //     player.nombre = jugador.nombre;
      //     player.apodo = jugador.nickname;
      //     player.email = jugador.email;
      //     player.sexo = jugador.sexo;

      //   switch(que) {
      //     case 'todos': 
      //     cantidad = this.listaJugadas.filter(j => j.usuario == jugador.email).length;
      //     break;
      //     case 'ganadores': 
      //     cantidad = this.listaJugadas.filter(j => j.usuario == jugador.email && j.gano).length;
      //     break;
      //     case 'perdedores': 
      //     cantidad = this.listaJugadas.filter(j => j.usuario == jugador.email && !j.gano).length;
      //     break;
      //   }
      //   this.listadoJugadores.push();
      // });

      
    }

  // TraerTodos(){
  //   //alert("totos");
  //   this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
  // TraerGanadores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
  // TraerPerdedores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }

}
