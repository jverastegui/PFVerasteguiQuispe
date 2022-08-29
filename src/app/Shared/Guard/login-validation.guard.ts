import { JsonPipe } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { LoginService } from '../Services/login.service';
import { SesionModel } from '../Models/sesion-model';
import { selectLoginState } from 'src/app/State/login.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LoginValidationGuard implements CanActivate,OnDestroy {
  Sesion$ = this.store.select<SesionModel>(selectLoginState);
  suscripcion:Subscription;
constructor(private login: LoginService,private router: Router, private store:Store){

}
  ngOnDestroy(): void {
    if(this.suscripcion) this.suscripcion.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let obj:SesionModel=JSON.parse(sessionStorage.getItem('UserData') ?? '{}') as SesionModel;
    
    if((obj.idSession??0)==0){
      this.router.navigate(['core','Login']);
      return false;
    }else{
      return this.login.ValidateSesion(obj).pipe(map((e:boolean) => {
        if (e) {
            
            return true;
        }else{
          this.router.navigate(['core','Login']);
          return false;
        }
      }));
    }
    
  
  }
  
}
