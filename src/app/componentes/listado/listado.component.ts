import { Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/clases/juego';
import { FirebaseService } from '../../servicios/firebase.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Juego>;
  public listaJuegos: Array<Juego>;

   miServicioJuego:JuegoServiceService

   constructor(private db : FirebaseService) {
    this.listarResultados();
    this.filtrarLista('todos');
   }

  ngOnInit() {

  }

  listarResultados(){
        this.db.getJuegos().subscribe(
          (lista: Array<Juego>) => {
               this.listaJuegos = lista;
          }
        )}


  filtrarLista(quienes: string) {

    switch(quienes) {
      case 'ganadores':
        this.listadoParaCompartir = this.listaJuegos.filter(j => j.gano == true);
        break;
      case 'perdedores':
        this.listadoParaCompartir = this.listaJuegos.filter(j => j.gano == false);
        break;
      case 'mejores5':
        this.listadoParaCompartir = this.listaJuegos.filter(j => j.gano == true).sort((a,b)=>{return b.puntaje - a.puntaje});
        this.listadoParaCompartir.length = 5; 
        break;
      default:
        this.listadoParaCompartir = this.listaJuegos;
        break;
    }
  }


  llamaService(){
    console.log("llamaService");
    this.listadoParaCompartir= this.miServicioJuego.listar();
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });
  }
}
