import { AlumnoModel } from './alumno-model';
import { RolModel } from './rol-model';

export interface UsuarioModel {
    idUsuario?: number;
    nombres?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    userName: string;
    password: string;
    idAlumno?: number ;
    idRol?: number;
    alumno?: AlumnoModel ;
    rol?: RolModel ;
}