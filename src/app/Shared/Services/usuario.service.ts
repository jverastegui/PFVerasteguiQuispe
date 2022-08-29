import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioModel } from '../Models/usuario-model';
import { RolModel } from '../Models/rol-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private ApiUsuario:string= environment.baseUrl +  'usuario/';
  constructor(private httpClient: HttpClient) { }

  getAllUsuario():  Observable<UsuarioModel[]>
  {
   return this.httpClient.get<UsuarioModel[]>(
     this.ApiUsuario
   );
 }

 

 GetRoles():  Observable<RolModel[]>
 {
  return this.httpClient.get<RolModel[]>(
    this.ApiUsuario + 'GetRoles'
  );
}
 

 BuscarUsuario(data: string) : Observable<UsuarioModel[]>{
   return this.httpClient.get<UsuarioModel[]>(
     this.ApiUsuario + 'BuscarUsuario/' + data
   ); 
 }

 
 EliminarUsuario(IdUsuario: number) {
   return this.httpClient.delete(this.ApiUsuario  +IdUsuario);
 }


 AgregarUsuario(_user: UsuarioModel) {
   return this.httpClient.post<UsuarioModel>(this.ApiUsuario, _user);
 }
 



 EditarUsuario(_user:UsuarioModel) {
   
   return this.httpClient.put<UsuarioModel>(this.ApiUsuario + _user.idUsuario, _user);
 }


}
