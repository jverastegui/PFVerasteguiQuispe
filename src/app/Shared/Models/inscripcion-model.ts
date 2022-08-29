import { AlumnoModel } from './alumno-model';
import { CursoModel } from './curso-model';


export interface InscripcionModel {
    idAlumno: number;
    idCurso: number;
    fechaRegistro?: string;
    alumno?: AlumnoModel;
    curso?: CursoModel;
}
