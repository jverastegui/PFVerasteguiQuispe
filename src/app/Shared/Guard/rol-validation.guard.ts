import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionModel } from '../Models/sesion-model';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RolValidationGuard implements CanActivate {

  constructor(private login: LoginService,private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let obj:SesionModel=JSON.parse(sessionStorage.getItem('UserData') ?? '{}') as SesionModel;
    if((obj.idSession??0)==0){
      this.router.navigate(['core','Login']);
      return false;
    }else{
      if(obj.usuario?.idRol==1){
        return true;
      }
    }
    this.router.navigate(['core','RegistroAlumno']);
      return false;
  }
  
}
