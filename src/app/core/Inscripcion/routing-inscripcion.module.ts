import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroInscripcionComponent } from './registro-inscripcion/registro-inscripcion.component';

const rutas: Routes = [
  {
    path: '',
    component: RegistroInscripcionComponent,
 
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
export class RoutingInscripcionModule { }
