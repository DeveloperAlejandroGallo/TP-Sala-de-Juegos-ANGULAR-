import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { error } from 'console';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';//'src/environments/environment';
import { Juego } from '../clases/juego';
import { JuegoAgilidad } from '../clases/juego-agilidad';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  juegoList;


  constructor(private fireDB:AngularFireDatabase, private http:HttpClient) { 
    this.juegoList= this.fireDB.object('juegos').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
  }

  public crearJuego(juego: any){
    return this.http.post(environment.firebase.databaseURL+"/juegos.json",juego);
 }

 public crearJuegoAgilidad(juego: JuegoAgilidad){
   console.log('En el serv a guardar');
  return this.http.post(environment.firebase.databaseURL+"/juegos.json",juego).catch(err=> { throw 'error_ '+err;  } );
}


 obtenerJuegos(){
   this.juegoList= this.fireDB.object('juegos').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
   return this.juegoList;
 }

 obtenerJuegosPorEmail(email:string){
   // Antes de devolver la info a la que me suscribo, paso por el map
   return this.http.get(environment.firebase.databaseURL+"/juegos.json").pipe(map(resp=>{
     return this.filterByEmail(resp,email)}));
 }



 public filterByEmail(res: any, email: string) {
  let juegos;
  let aux=null;
  juegos=this.objecToArray(res);
    for (let index = 0; index < juegos.length; index++) {
      const element = juegos[index];
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
