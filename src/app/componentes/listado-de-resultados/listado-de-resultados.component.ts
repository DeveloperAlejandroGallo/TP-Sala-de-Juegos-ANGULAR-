
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Juego } from '../../clases/juego';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listado: Array<Juego>;

 listadoGeneral: Array<Juego>;
 listadoGanadores : Array<Juego>;
 listadoPerdedores : Array<Juego>;
 misResultados : Array<Juego>;

  constructor(private db : FirebaseService) {
    // this.listarResultados();
   }

  ngOnInit() {

  }

  // listarResultados(){
  //       this.db.getJuegos().subscribe(
  //         (lista: Array<Juego>) => {
  //              this.listadoGeneral = lista;
  //         }
  //       )}


}
