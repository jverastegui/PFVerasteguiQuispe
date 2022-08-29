import { AlumnoModel } from './alumno-model';
import { UsuarioModel } from './usuario-model';


export interface SesionModel {
    idSession: number;
    idUsuario: number | null;
    token: string | null;
    usuario: UsuarioModel | null;
}