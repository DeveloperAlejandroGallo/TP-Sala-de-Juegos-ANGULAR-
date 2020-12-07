import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AuthenticationService } from '../../servicios/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() usrActivoOutput: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  usuarioActivo;
  usuario: Usuario;

  constructor(private router:Router,
              public authService: AuthenticationService,
              private usuarioService: UsuariosService) {
  }
  
  ngOnInit(): void {
    this.authService.currentUser().then(resp=>{
      this.usuarioActivo=resp;
      console.log('usuarioActivo ' + this.usuarioActivo.email);
    
      this.usuarioService.getUsersByEmail(this.usuarioActivo.email).subscribe(ret => {
        this.usuario = ret;
        console.log('Usr: ');
        console.table(this.usuario);
        this.usrActivoOutput.emit(this.usuario);
      });
  
    });
  }

  cerrarSesion(){
    this.authService.logOut().then( resp =>{
      this.usuarioActivo=null;
      this.authService.estaLogueado = false;
      this.router.navigate(['/login']);
    });
  }



  
}
