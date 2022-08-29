import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { InscripcionModel } from '../Models/inscripcion-model';
import { CursoModel } from '../Models/curso-model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private ApiCurso:string= environment.baseUrl +  'inscripcion/';
  constructor(private httpClient: HttpClient) { }

  
  getAllInscripcionesByAlumno(IdAlumno:number):  Observable<InscripcionModel[]>
  {
   return this.httpClient.get<InscripcionModel[]>(
     this.ApiCurso + IdAlumno
   );
 }

 GetCursosDisponibles(IdAlumno:number):  Observable<CursoModel[]>
 {
  return this.httpClient.get<CursoModel[]>(
    this.ApiCurso + 'GetCursosDisponibles/' +IdAlumno
  );
}

SearchCursosDisponibles(IdAlumno:number,name:string):  Observable<CursoModel[]>
{
 return this.httpClient.get<CursoModel[]>(
   this.ApiCurso + 'SearchCursosDisponibles/' +IdAlumno + '/' + name
 );
}



 getInscripcionByAlumnoAndCurso(IdAlumno:number,IdCurso:number):  Observable<InscripcionModel>
 {
  return this.httpClient.get<InscripcionModel>(
    this.ApiCurso + IdAlumno + '/' + IdCurso
  );
}
 


 
 EliminarInscripcion(IdAlumno:number, IdCurso: number) {
   return this.httpClient.delete(this.ApiCurso + IdAlumno+ '/' +IdCurso);
 }


 AgregarInscripcion(_inscripcion: InscripcionModel) {
   return this.httpClient.post<InscripcionModel>(this.ApiCurso, _inscripcion);
 }
 



}
