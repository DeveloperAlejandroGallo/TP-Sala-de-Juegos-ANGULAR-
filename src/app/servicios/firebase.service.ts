import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Juego } from '../clases/juego';
import { Jugador } from '../clases/jugador';
import * as fire from "firebase";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private firebase: AngularFirestore) {}

  jugadoresCollection = 'jugadores';
  juegoCollection = 'juegos'
  filtrado: any;

  public getJugadores() {
    // esto devuelve un observ. Al cual le haces un suscribe.
    return this.firebase.collection(this.jugadoresCollection).valueChanges();
  }
  public getJugadorByEmail(email: string): Jugador {
    let listaJugadores = new Array<Jugador>();

    this.getJugadores().subscribe(
      (lista: Array<Jugador>) => {
           listaJugadores = lista;
      }
    )
    return listaJugadores.find(j=>j.email == email);
  }
  //  Agarras la col, armas un json para guardarlo
  public saveJugadores(jugador: Jugador): Promise<any> {
    return this.firebase.collection(this.jugadoresCollection).add({
      email: jugador.email,
      nombre: jugador.nombre,

      avatar: jugador.avatar, // dir relativa
      perfil: jugador.perfil, // admin o usr normal
      fecha: fire.firestore.Timestamp.now().toDate()
    }).catch(error => {
      console.error("Error al agregar usuario a la coleccion", error);
    });
  }

  public getJuegos() {
    return this.firebase.collection(this.juegoCollection).valueChanges();
  }

  //Ver de hacer un to json de cada objeto para guardar todos los datos directamente.

  public saveJuego(juego: Juego): Promise<any> {
    return this.firebase.collection(this.juegoCollection).add({
      nombre: juego.nombre,
      usuario: juego.usuario,
      jugador: juego.jugador,
      gano: juego.gano,
      puntaje: juego.puntaje,
      intentos: juego.intentos,
      fecha: fire.firestore.Timestamp.now().toDate()
    }).catch(error => {
      console.error("Error al agregar registro a la coleccion de Juegos.",error);
    });
  }


}
