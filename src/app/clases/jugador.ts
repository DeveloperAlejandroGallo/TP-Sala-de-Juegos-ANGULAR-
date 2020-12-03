
export class Jugador {
    nickname: string;
    nombre: string;
    email: string;
    avatar: string;
    perfil: string;
    
    constructor(nickname: string, nombre?: string, email?: string , avatar?: string , perfil?: string) {
        this.nickname = nickname;
        this.nombre = nombre;
        this.email  = email; 
        this.avatar = avatar;
        this.perfil = perfil;
    }
    
}