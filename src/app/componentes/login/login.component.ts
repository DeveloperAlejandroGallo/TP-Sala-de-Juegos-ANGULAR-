import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Usuario } from '../../clases/usuario';
import { AuthenticationService } from '../../servicios/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario: Usuario;
  clave: string;
  email: string;
  progreso: number;
  progresoMensaje = "esperando...";
  logeando = true;
  ProgresoDeAncho: string;

  clase = "progress-bar progress-bar-info progress-bar-striped ";
  msg: string;

  constructor(
    private fireAuth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.progreso = 0;
    this.ProgresoDeAncho = "0%";
  }

  ngOnInit() {
  }

  public save(event): void {
    this.MoverBarraDeProgreso();
  }

  Entrar() {
    if (this.email === 'admin@admin.com' && this.clave === 'adminadmin') {
      this.router.navigate(['/Principal']);
    } else {
      this.onLogin();
    }
  }

  async onLogin(): Promise<void> {
    try {
      this.usuario = new Usuario(this.email, this.clave);

      const logging = await this.fireAuth.login(this.usuario);
      if (logging) {
        sessionStorage.setItem('usuario', this.email);//JSON.stringify(this.email)
        this.fireAuth.estaLogueado = true;
        this.fireAuth.redirect('Principal');
      } else {
        this.fireAuth.redirect('Error');
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.msg = 'Correo con formato incorrecto';
          break;
        case 'auth/wrong-password':
          this.msg = 'Clave incorrecta';
          break;
        case 'auth/user-not-found':
          this.msg = 'El usuario no existe.';
          break;
        default:
          this.msg = error.message;
      }
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: 'error'
      }).then(a => {
        if (error.code === 'auth/user-not-found') {
          this.fireAuth.redirect('Registro');
        }
      });



    }
  }


  MoverBarraDeProgreso() {
    console.log(this.email);
    if (this.email == ('' || undefined || null) || this.clave ==  ('' || undefined || null) ) {
      console.log('disparar swal');
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese email y clave para ingresar.',
        icon: 'error'
      });
    } 
    else {

      this.logeando = false;
      this.clase = "progress-bar progress-bar-danger progress-bar-striped active";
      this.progresoMensaje = "NSA spy...";
      let timer = TimerObservable.create(200, 50);
      this.subscription = timer.subscribe(t => {
        console.log("inicio");
        this.progreso = this.progreso + 1;
        this.ProgresoDeAncho = this.progreso + 20 + "%";
        switch (this.progreso) {
          case 15:
            this.clase = "progress-bar progress-bar-warning progress-bar-striped active";
            this.progresoMensaje = "Verificando ADN...";
            break;
          case 30:
            this.clase = "progress-bar progress-bar-Info progress-bar-striped active";
            this.progresoMensaje = "Adjustando encriptación..";
            break;
          case 60:
            this.clase = "progress-bar progress-bar-success progress-bar-striped active";
            this.progresoMensaje = "Recompilando Info del dispositivo..";
            break;
          case 75:
            this.clase = "progress-bar progress-bar-success progress-bar-striped active";
            this.progresoMensaje = "Recompilando claves facebook, gmail, chats..";
            break;
          case 85:
            this.clase = "progress-bar progress-bar-success progress-bar-striped active";
            this.progresoMensaje = "Instalando KeyLogger..";
            break;

          case 100:
            console.log("final");
            this.subscription.unsubscribe();
            this.Entrar();
            this.logeando = true;
            break;
        }
      });

   
    }
  }

  public loguearUsuario(usr: string) {

    switch (usr) {
      case 'admin':
        this.email = 'admin@admin.com';
        this.clave = 'adminadmin';
        break;
      case 'jugador1':
        this.email = 'jugador1@yopmail.com';
        break;
      case 'jugador2':
        this.email = 'jugador2@yopmail.com';
        break;
      case 'jugador3':
        this.email = 'jugador3@yopmail.com';
        break;
      case 'jugador4':
        this.email = 'jugador4@yopmail.com';
        break;
      case 'jugador5':
        this.email = 'jugador5@yopmail.com';
        break;
      case 'jugador6':
        this.email = 'jugador6@yopmail.com';
        break;
    }
    if (usr != 'admin') {
      this.clave = '123456';
    }

  }




}
