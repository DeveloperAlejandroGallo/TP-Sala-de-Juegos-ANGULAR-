import { Juego } from './juego';

export class JuegoAnagrama extends Juego {

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super('Anagrama', gano, sessionStorage.getItem('usuario'), 0);
        this.puntaje = 0;
        this.llenarTabla();
      }

      anagrama: string;
      respuestaUsr: string;
      respuestaCorrecta: string;
      anagramaTable: Array<[string, string]>;
      puntaje: number;

    inicializar(){
        this.anagrama = '';
        this.respuestaCorrecta = '';
        this.respuestaUsr = '';
        this.puntaje = 0;
    }


    public verificar(): boolean {
        if ( this.respuestaCorrecta.toUpperCase() === this.respuestaUsr.toUpperCase()){
            this.gano = true;
            this.puntaje++;
        } else {
            this.gano = false;
        }
        this.registrarJugada(this.gano, this.puntaje);
        return this.gano;
    }


    public seleccionarUno()
    {
        const tupla = this.anagramaTable[Math.floor(Math.random() * this.anagramaTable.length)];
        this.anagrama = tupla[0];
        this.respuestaCorrecta = tupla[1];
    }


    llenarTabla() {
        this.anagramaTable = new Array(
        ['ACELERADNOS', 'ACERANDOLES'],
        ['ACERTANDOLES', 'ALTERCANDOSE'],
        ['ACUERDO', 'ECUADOR'],
        ['AGONISTA', 'SANTIAGO'],
        ['AIRES', 'ARIES'],
        ['ALEGAN', 'ANGELA'],
        ['AMOR', 'ROMA'],
        ['AMPARO', 'PARAMO'],
        ['ARETES', 'TERESA'],
        ['ARMONIA', 'MARIANO'],
        ['ARMONIZACION', 'ROMANIZACION'],
        ['ASPERO', 'ESPORA'],
        ['CALDEARNOS', 'ENCARADLOS'],
        ['CALIENTE', 'ALICANTE'],
        ['CAMELIA', 'MICAELA'],
        ['CAMINO', 'MONICA'],
        ['COLINAS', 'NICOLAS'],
        ['CONSERVADORA', 'CONVERSADORA'],
        ['CORNISA', 'NARCISO'],
        ['DESAMPARADOR', 'DESPARRAMADO'],
        ['DEUDORA', 'EDUARDO'],
        ['EL', 'LE'],
        ['ELECTROMAGNETICO', 'MAGNETOELECTRICO'],
        ['ENAMORAMIENTOS', 'ARMONIOSAMENTE'],
        ['ENERGETICAMENTE', 'GENERICAMENTE'],
        ['ENFRIAMIENTO', 'REFINAMIENTO'],
        ['ENLODAR', 'LEANDRO'],
        ['ESCABULLIMIENTO', 'BULLICIOSAMENTE'],
        ['ESCANDALIZAR', 'ZASCANDILEAR'],
        ['ESTA', 'ATES'],
        ['FOTOLIGOGRAFIA', 'LITOFOTOGRAFIA'],
        ['FRASE', 'FRESA'],
        ['IMPONDERABLEMENTE', 'IMPERDONABLEMENTE'],
        ['INTEGRARLA', 'INGLATERRA'],
        ['IRONICAMENTE', 'RENACIMIENTO'],
        ['LICUA', 'LUCIA'],
        ['MATAR', 'MARTA'],
        ['MATERIALISMO', 'MEMORIALISTA'],
        ['MORA', 'ROMA'],
        ['NACIONALISTA', 'ALTISONANCIA'],
        ['NECROFILA', 'FLORENCIA'],
        ['NEPAL', 'PANEL'],
        ['OVOIDE', 'OVIEDO'],
        ['PAGAR', 'PRAGA'],
        ['PODER', 'PEDRO'],
        ['PODER', 'PEDRO'],
        ['POSARE', 'POSERA'],
        ['PRESA', 'RAPES'],
        ['PRESUPOSICION', 'SUPERPOSICION'],
        ['PRISA', 'PARIS'],
        ['PRONOSTICACION', 'CONTRAPOSICION'],
        ['QUIEREN', 'ENRIQUE'],
        ['RAMON', 'NORMA'],
        ['RAZA', 'ZARA'],
        ['RECONQUISTADOS', 'CONQUISTADORES'],
        ['RECTIFICABLE', 'CERTIFICABLE'],
        ['REIAS', 'RIASE'],
        ['RESTO', 'RETOS'],
        ['RIESGO', 'SERGIO'],
        ['RIESGO', 'SERGIO'],
        ['SACO', 'COSA'],
        ['SALARIO', 'ROSALIA'],
        ['SAUNAS', 'SUSANA'],
        ['SOPERA', 'SOPEAR'],
        ['SORDIDAMENTE', 'DESMENTIDORA'],
        ['TERSO', 'TEROS'],
        ['TOPERA', 'TREPAOS'],
        ['VALORA', 'ALVARO'],
        ['VENTILAN', 'VALENTIN']);
    }

}
