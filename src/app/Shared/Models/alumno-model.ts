import { InscripcionModel } from './inscripcion-model';
import { TipodocumentoModel } from './tipodocumento-model';
export interface AlumnoModel {
      idAlumno?: number;
      nombres?: string;
      apellidoPaterno?: string;
      apellidoMaterno?: string;
      idTipoDocumento?: number;
      nroDocumento?: string;
      fechaNacimiento?: Date;
      edad?: number;
      sexo?: string;
      email: string;
      inscripcion?: Array<InscripcionModel>;
      documento?:  TipodocumentoModel;
 
  }