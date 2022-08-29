import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

const rutas: Routes = [
  {
    path: '',
    component: IniciarSesionComponent,
 
  } //, { path: '', redirectTo: '/core/Login', pathMatch:'full'}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports:[RouterModule]
})
export class RoutingLoginModule { }
