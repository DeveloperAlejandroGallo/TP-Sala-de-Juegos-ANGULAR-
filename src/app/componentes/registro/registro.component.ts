import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { AuthenticationService } from '../../servicios/authentication.service';

//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

mensaje: string;
usuario: Usuario;

  constructor(private authService: AuthenticationService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  
  public createUserFireBase() {

    this.authService.register(this.usuario).then(res => {
      console.log(res);

      this.mensaje = 'Registro exitoso.';
      this.router.navigate(['Principal']);

    }).catch(error => {
      console.log(error);
      switch (error.code)
      {
        case 'auth/weak-password':
          this.mensaje = 'La clave debe poseer al menos 6 caracteres';
          break;
        case 'auth/email-already-in-use':
          this.mensaje = 'Correo ya registrado';
          break;
          case 'auth/invalid-email':
            this.mensaje = 'Correo con formato invalido';
            break;
          case 'auth/argument-error':
            this.mensaje = 'Correo con debe ser una cadena v\u00E1lida';
            break;
          default:
            this.mensaje = 'Error en registro';
      }
    });
  }



}
