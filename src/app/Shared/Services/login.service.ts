import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SesionModel } from '../Models/sesion-model';
import { AlumnoModel } from '../Models/alumno-model';
import { UsuarioModel } from '../Models/usuario-model';
import { Store } from '@ngrx/store';
import { selectLoginState } from 'src/app/State/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private ApiLogin: string = environment.baseUrl + 'Login/';
  public NombreUsuario:string='';
  public IsAdmin:boolean;
  private User$=this.store.select<SesionModel>(selectLoginState);

  constructor(private httpClient: HttpClient, public store:Store) {

  }

  getAllSesion(): Observable<SesionModel[]> {
    return this.httpClient.get<SesionModel[]>(
      this.ApiLogin
    );
  }

  getSesionById(id:number): Observable<SesionModel> {
    return this.httpClient.get<SesionModel>(
      this.ApiLogin + id
    );
  }

  ValidateLogin(user:UsuarioModel): Observable<SesionModel> {
    return this.httpClient.post<SesionModel>(
      this.ApiLogin, user
    );
  }

  ValidateSesion(data:SesionModel): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.ApiLogin + "ValidateSesion", data
    );
  }

  CerrarSesion(id:number): Observable<SesionModel> {
    return this.httpClient.delete<SesionModel>(
      this.ApiLogin + id
    );
  }

  ValidateIsAdmin(){
    let obj:SesionModel=JSON.parse(sessionStorage.getItem('UserData') ?? '{}') as SesionModel;
    if((obj.idSession??0)==0){
      this.IsAdmin= false;
    }else{
      if(obj.usuario?.idRol==1){
        this.IsAdmin= true;
      }else{
        this.IsAdmin= false;
      }
    }
  }

}
