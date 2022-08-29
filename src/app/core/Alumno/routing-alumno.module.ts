import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
  {
    path: '',
    component: RegistroAlumnoComponent,
 
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
export class RoutingAlumnoModule { }
