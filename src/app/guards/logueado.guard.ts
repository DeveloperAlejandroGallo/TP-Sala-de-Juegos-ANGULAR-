import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthenticationService } from '../servicios/authentication.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate {
  
  constructor(private autentica: AuthenticationService, 
    private router: Router,
    private usuarioService: UsuariosService){

      this.autentica.currentUser().then(rta =>{
        this.usrActivo = rta;
  
        // this.usuarioService.getUsersByEmail(this.usrActivo.email).subscribe(res => {
        //   this.usuario = res;
        // });
  
      });

    }

usrActivo;
usuario: Usuario;
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const url: string = state.url;
    
    return this.estaRegistrado(url);
  }
  
  public estaRegistrado(url: string): boolean{
    // console.log('guard: '+this.usrActivo );
    // if (this.usrActivo != undefined && this.usrActivo.email.length > 0 )
    
    //if (this.autentica.estaLogueado )
      return true;
  
    this.autentica.redirectUrl = url;
    this.router.navigate(['/error']);
    return false;


  }


}
