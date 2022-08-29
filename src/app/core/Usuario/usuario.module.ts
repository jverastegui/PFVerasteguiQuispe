import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RoutingUsuarioModule } from './routing-usuario.module';
import { SharedModule } from '../../Shared/shared.module';



@NgModule({
  declarations: [
    RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    RoutingUsuarioModule,
    SharedModule
  ]
})
export class UsuarioModule { }
