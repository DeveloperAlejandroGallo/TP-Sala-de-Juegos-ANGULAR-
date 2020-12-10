
export class Jugador {
    nickname: string;
    nombre: string;
    email: string;
    avatar: string;
    perfil: string;
    sexo: string;
    
    constructor(nickname?: string, nombre?: string, email?: string , avatar?: string , perfil?: string, sexo?:string) {
        this.nickname = nickname ? nickname : '';
        this.nombre = nombre ? nombre : '';
        this.email  = email ? email : ''; 
        this.avatar = avatar ? avatar : '';
        this.perfil = perfil ? perfil : '';
        this.sexo = sexo ? sexo : '';
    }
    
}