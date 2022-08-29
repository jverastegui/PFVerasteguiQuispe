import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroCursoComponent } from './registro-curso/registro-curso.component';

const rutas: Routes = [
  {
    path: '',
    component: RegistroCursoComponent,
 
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
export class RoutingCursoModule { }
