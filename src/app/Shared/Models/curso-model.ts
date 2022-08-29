import { InscripcionModel } from './inscripcion-model';

export interface CursoModel {
    idCurso: number;
    nombreCurso: string;
    profesor: string;
    horasAcademicas: number;
    horario: string;
    fechaInicio: string;
    fechaFin: string;
    horaInicio: string;
    horaFin: string;
    inscripcion?: Array<InscripcionModel>;
}