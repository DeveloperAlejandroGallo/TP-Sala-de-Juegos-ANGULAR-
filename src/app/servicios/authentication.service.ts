import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import { Usuario } from '../clases/usuario';
import { FirebaseService } from './firebase.service';
import { Jugador } from '../clases/jugador';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jugador: Jugador;

  constructor(private fireAuth: AngularFireAuth, 
              private fireCloud: FirebaseService,
              private router: Router) { }

  async login(usuario: Usuario): Promise<any> {
       const {user} = await this.fireAuth.signInWithEmailAndPassword(usuario.email, usuario.password);
        sessionStorage.setItem("usuario", JSON.stringify(usuario.email));
       return user;
  }


  async register(usuario: Usuario): Promise<any> {
    try {
      const {user} = await this.fireAuth.createUserWithEmailAndPassword(usuario.email, usuario.password);
      await this.verificationEmailFirebase();
      this.jugador = new Jugador('','',usuario.email,'','');
      this.fireCloud.saveJugadores(this.jugador);
      console.info(`Usuario creado ${usuario.email}`);
      return user;
    } catch (error) {
      console.error("Error al registrarse en Firebase", error);
    }
  }


  async verificationEmailFirebase(): Promise<void> {
    try {
      return (await this.fireAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.error("Error en la verificacion de email", error);
    }
  }


  async logOut(): Promise<void> {
    await this.fireAuth.signOut().then(res => {
      sessionStorage.removeItem("usuario");
      this.redirect('login');
    }).catch(error => {
      console.log(error);
      this.redirect('error');
    });

  }

  public redirect(router: string): void {
    this.router.navigate([router]);
  }


}
