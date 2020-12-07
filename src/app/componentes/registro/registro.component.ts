import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageFirebaseService } from '../../servicios/storage-firebase.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import { Usuario } from '../../clases/usuario';
import Swal from "sweetalert2";
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router,
    private fireAuth: AuthenticationService,
    private fireStorage: StorageFirebaseService,
    private userService: UsuariosService,
    private jugadorServ: JugadoresService) { }

  public usuario: Usuario;
  public jugador: Jugador;

  public msg: string;
  public publicURL;
  public usrActivo;
  public adminActivo;

  public email: string;
  public clave: string;
  public nombre: string;
  public apellido: string;
  public imagen: string;
  public perfil: string; // Profesional - Paciente - Administrador
  public activo: boolean;
  public nickname: string;



  ngOnInit(): void {
   }




  public registrar() {
    // this.fireAuth.register(this.user);

    if (this.datosCorrectos()) {

      this.usuario = new Usuario(this.email, this.clave);

      this.fireAuth.register(this.usuario).then(res => {
        console.log(res);

      }).catch(error => {
        console.log(error);
        switch (error.code) {
          case 'auth/weak-password':
            this.msg = 'La clave debe poseer al menos 6 caracteres';
            break;
          case 'auth/email-already-in-use':
            this.msg = 'Correo ya registrado';
            break;
          case 'auth/invalid-email':
            this.msg = 'Correo con formato inv\u00E1lido';
            break;
          case 'auth/argument-error':
            if (error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')
              this.msg = 'Correo con debe ser una cadena v\u00E1lida';
            else
              this.msg = 'La constrase\u00F1a debe ser una cadena v\u00E1lida';
            break;
          case 'auth/argument-error':
            this.msg = 'Correo con debe ser una cadena v\u00E1lida';
            break;
          default:
            this.msg = 'Error en registro';
        }
        Swal.fire({
          title: 'Error',
          text: this.msg,
          icon: 'error'
        });
        return;
      });

      let refImg;

      let userMetaData = {
        nombre: this.nombre,
        nickname: this.nickname,
        email: this.email
      };

      this.fireStorage.uploadFile(this.nickname, this.imagen, userMetaData).then(resp => {
        refImg = this.fireStorage.linkToPublicFile(this.nickname);
        console.log("refImg1" + refImg);
        refImg.getDownloadURL().subscribe((URL) => {
          console.log("link publico : " + URL);
          this.publicURL = URL;

          this.userService.createUser(this.usuario).subscribe((res: any) => {

            this.jugador =  new Jugador(this.nickname,this.nombre, this.email, this.publicURL, 'Jugador');

            this.jugadorServ.crearJugador(this.jugador).subscribe((res: any)=>{
              Swal.fire({
                title: 'Registro exitoso',
                text: 'Bienvenido ' + this.jugador.nickname,
                icon: 'success'
              }).then(r=>{
                this.CleanFields();
                this.router.navigate(['/Login']);
              });
            });
          });
        });
      }).catch(error => { console.log("Error al subir avatar" + error) });
    } 
    else {
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: 'error'
      });
    }
  }

  private CleanFields() {
    this.email = '';
    this.clave = '';
    this.publicURL = '';

    this.nombre = '';
    this.nickname = '';
    this.imagen = '';
    this.perfil = '';

    this.msg = '';
  }

  private datosCorrectos() {

    this.msg = 'Faltan completar datos: ';

    if (this.nombre == ('' || undefined)) {
      this.msg += 'Nombre, '
    }
    if (this.email == ('' || undefined)) {
      this.msg += 'Email, '
    }
    if (this.clave == ('' || undefined)) {
      this.msg += 'Clave, '
    }
    if (this.imagen == ('' || undefined)) {
      this.msg += 'Avatar, ';
    }

    if (this.msg === 'Faltan completar datos: ') {
      this.msg = '';
      return true;
    }
    else {
      this.msg = this.msg.slice(0, -2);
      return false;
    }

  }

  public volver() {
    this.router.navigate(['/login']);
  }

  public assignImg(src: string) {
    console.log('img cliequeada ' + src)

  }

  public imgUpload(img) {
    this.imagen = img;
  }

}
