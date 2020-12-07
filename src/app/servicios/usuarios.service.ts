import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../../environments/environment';//'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../clases/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  userList;
  public usuarioActual: Usuario;

  constructor(private fireUsers:AngularFireDatabase, private http:HttpClient) {
    
    this.userList= this.fireUsers.object('usuarios').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));

   }

   createUser(user:Usuario){
     return this.http.post(environment.firebase.databaseURL+"/usuarios.json",user);
  }

  getUsers(){
    this.userList= this.fireUsers.object('usuarios').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
    return this.userList;
  }

  getUsersByEmail(email:string){
    // Antes de devolver la info a la que me suscribo, paso por el map
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterByEmail(resp,email)}));
  }

  public getUsersByProfile(profile:string){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterByProfile(resp,profile)}));
  }
  
  public getUsersErased(){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterErased(resp)}));
  }

  getUsersBySpeciality(spec:string){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterBySpeciality(resp,spec)}));
  }

  getInactiveUsers(state:boolean){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterByState(resp,state)}));
  }


  getUsuarioById(id:string){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterById(resp,id)}));
  }

  changeUserState(id:string,state:boolean){
    let fechaBaja: string;
    let diaInfo = new Date();
    let mesStr: string;
    let mes = diaInfo.getMonth();
    mes = mes +1;
    mesStr = mes.toString();

    if(mes < 10)
     mesStr = '0' + mes.toString();


    fechaBaja = diaInfo.getDate().toString() + '/' + mesStr + '/' + diaInfo.getFullYear().toString();
    return this.http.patch(environment.firebase.databaseURL+"/usuarios/"+id+".json",{activo:state, fechaBaja:fechaBaja}).subscribe(resp=>{
    });    
  }


public filterByEmail(res: any, email: string) {
  let usuarios;
  let aux=null;
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.email == email) {
        aux = element;
      }
    }
    return aux;
}

public filterByState(res: any, state: boolean) {
  let usuarios;
  let aux=null;
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.activo == state) {
        aux = element;
      }
    }
    return aux;
}


public filterById(res: any, id: string) {
  let usuarios;
  let aux=null;
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.id == id) {
        aux = element;
      }
    }
    return aux;
}

public filterByProfile(res: any, profile: string) {
  let usuarios;
  let aux=[];
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      // console.warn(element);
      if (element.perfil == profile && element.activo == true) {
        aux.push(element);
      }
    }
    return aux;  
}

public filterErased(res: any) {
  let usuarios;
  let aux=[];
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      console.table(element);
      if (element.activo == false) {
        aux.push(element);
      }
    }
    return aux;  
}
public filterBySpeciality(res: any, spec: string) {
  console.log('filterBySpeciality:' + spec);
  let usuarios;
  let aux=[];
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
       const element = usuarios[index];
      // console.log('element '+index+ ':' +element);      
      if (element.speciality == spec) {
        aux.push(element);
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
