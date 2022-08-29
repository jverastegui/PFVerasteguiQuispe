import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CursoModel } from '../Models/curso-model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  public ListaCursos: Array<CursoModel> = [];
  public alumnos$: Observable<CursoModel[]>;
  private ApiCurso:string= environment.baseUrl +  'cursos/';
  constructor(private httpClient: HttpClient) {

   }

   getAllCursos():  Observable<CursoModel[]>
   {
    return this.httpClient.get<CursoModel[]>(
      this.ApiCurso
    );
  }
  

  BuscarCurso(data: string) : Observable<CursoModel[]>{
    return this.httpClient.get<CursoModel[]>(
      this.ApiCurso + 'BuscarCurso/' + data
    ); 
  }

  
  EliminarCurso(IdCurso: number) {
    return this.httpClient.delete(this.ApiCurso  +IdCurso);
  }


  AgregarCurso(_curso: CursoModel) {
    return this.httpClient.post<CursoModel>(this.ApiCurso, _curso);
  }
  
 


  EditarCurso(_curso:CursoModel) {
    
    return this.httpClient.put<CursoModel>(this.ApiCurso + _curso.idCurso, _curso);
  }


}



