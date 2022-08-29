import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RoutingLoginModule } from './routing-login.module';



@NgModule({
  declarations: [
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutingLoginModule
  ]
})
export class LoginModuleModule { }
