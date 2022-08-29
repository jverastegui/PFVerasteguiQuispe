import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AlumnoModel } from '../Models/alumno-model';
import { TipodocumentoModel } from '../Models/tipodocumento-model';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  public ListaAlumnos: Array<AlumnoModel> = [];
  public alumnos$: Observable<AlumnoModel[]>;
  //private ApiAlumno:string='http://institutoacademico.somee.com/api/alumnos/';
  private ApiAlumno:string= environment.baseUrl + 'alumnos/';
  private alumnos: Subject<AlumnoModel[]>;
  constructor( private httpClient: HttpClient) { 

    this.alumnos = new Subject();
    this.alumnos$ = this.alumnos.asObservable();
    this.httpClient.get(
     this.ApiAlumno
    ).subscribe(respuesta => {
      this.alumnos.next((respuesta as any).results);
    });
  }

  getAllAlumnos():  Observable<AlumnoModel[]>
   {
   
    return this.httpClient.get<AlumnoModel[]>(
      this.ApiAlumno
    );
  }

  getAlumnoById(Id:number):  Observable<AlumnoModel>
   {
   
    return this.httpClient.get<AlumnoModel>(
      this.ApiAlumno + Id
    );
  }

  getTipoDocumento():  Observable<TipodocumentoModel[]>
   {
   
    return this.httpClient.get<TipodocumentoModel[]>(
      this.ApiAlumno + "GetTipoDocumento"
    );
  }
  

  BuscarAlumno(data: string) : Observable<AlumnoModel[]>{
    return this.httpClient.get<AlumnoModel[]>(
      this.ApiAlumno + 'SearchAlumno/' + data
    ); //.pipe(map( x => x.filter( a => (a.nombres + ' ' + a.apellidoPaterno + ' ' + a.apellidoMaterno).toUpperCase().indexOf(data.toUpperCase())!=-1
    //)));
  }

  
  EliminarAlumno(IdAlumno: number) {
    return this.httpClient.delete(this.ApiAlumno  +IdAlumno);
  }


  AgregarAlumno(_alumno: AlumnoModel) {
    return this.httpClient.post<AlumnoModel>(this.ApiAlumno, _alumno);
  }
  
 


  EditarAlumno(_alumno:AlumnoModel) {
    
    return this.httpClient.put<AlumnoModel>(this.ApiAlumno + _alumno.idAlumno, _alumno);
  }

}


