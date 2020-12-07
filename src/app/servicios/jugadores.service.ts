import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Jugador } from '../clases/jugador';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadoresList;


  constructor(private fireDB:AngularFireDatabase, private http:HttpClient) { 
    this.jugadoresList= this.fireDB.object('jugadores').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
  }

  public crearJugador(jugador:Jugador){
    return this.http.post(environment.firebase.databaseURL+"/jugadores.json",jugador);
 }

 obtenerJugadores(){
   this.jugadoresList= this.fireDB.object('jugadores').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
   return this.jugadoresList;
 }

 getJugadorPorEmail(email:string){
   // Antes de devolver la info a la que me suscribo, paso por el map
   return this.http.get(environment.firebase.databaseURL+"/jugadores.json").pipe(map(resp=>{
     return this.filterByEmail(resp,email)}));
 }



 public filterByEmail(res: any, email: string) {
  let jugadores;
  let aux=null;
  jugadores=this.objecToArray(res);
    for (let index = 0; index < jugadores.length; index++) {
      const element = jugadores[index];
      if (element.email == email) {
        aux = element;
      }
    }
    return aux;
}

  /****Generic Function */

  private objecToArray( datos: Object ){
    const users = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
          let user: any = datos[key];
          user.id=key;
          users.push(user);
    })
    return users;
  }
}
