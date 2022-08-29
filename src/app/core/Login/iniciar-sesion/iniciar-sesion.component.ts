import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Shared/Content/toast/toast-service';
import { LoginService } from 'src/app/Shared/Services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/Shared/Content/SweetAlert/swal.service';
import { UsuarioModel } from '../../../Shared/Models/usuario-model';
import { SesionModel } from '../../../Shared/Models/sesion-model';
import { Store } from '@ngrx/store';
import { IniciarSesion } from 'src/app/State/login.actions';
import { Actions , ofType} from '@ngrx/effects';
import { selectLoginState } from 'src/app/State/login.selectors';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit, OnDestroy {

  public formulario: FormGroup;
  private suscripcion: Subscription;
  public IsTest:boolean=false;
  Sesion$ = this.store.select<SesionModel>(selectLoginState);

  constructor(private fb: FormBuilder, public toastService: ToastService, 
    public ServLogin: LoginService, private router:Router,private swal:SwalService, 
    private store:Store, private _actions$: Actions,) {
    this.formulario = fb.group({
      UserName: ['admin', [Validators.required]],
      Password: ['12345678', [Validators.required]]
    });
  }
  ngOnDestroy(): void {
    if (this.suscripcion) this.suscripcion.unsubscribe();
    this.toastService.clear();
  }

  setStorage(user:SesionModel){
    sessionStorage.setItem('UserData',JSON.stringify(user));
    return user;
  }

  submit($event: any) {
    
      if (this.formulario.valid) {
        let item: UsuarioModel = {
          userName: this.formulario.value.UserName,
          password: this.formulario.value.Password
        };

        this.store.dispatch(IniciarSesion(item));
        this.Sesion$.subscribe((data: SesionModel) => {
         
          if(data){
            if(data.idSession>0){
              sessionStorage.setItem('UserData',JSON.stringify(data));
              this.ServLogin.NombreUsuario=data.usuario?.userName?? '';
              this.ServLogin.ValidateIsAdmin();
              this.swal.Success('Inicio de Sesion','Bienvenido ' + data.usuario?.userName);
             
              if(!this.IsTest) this.router.navigate(['core','RegistroAlumno']);
            }else{
              let IsVal= sessionStorage.getItem('IsSuccessLogin');
              if(IsVal){
                if(IsVal=='1'){
                  this.swal.ToastError('Usuario y/o Contraseña Incorrectos.');
                  sessionStorage.removeItem('IsSuccessLogin');
                }
              }
             
            }
          } else{
            this.swal.ToastError('Usuario y/o Contraseña Incorrectos.');
          }     
        });

       

      } else {
        this.swal.ToastError('Todos los campos son obligatorios.');
      }
  
   
    

  }

  ngOnInit(): void {
  }

}


