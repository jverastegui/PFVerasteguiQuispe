import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

const rutas: Routes = [
  {
    path: '',
    component: RegistroUsuarioComponent,
 
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
export class RoutingUsuarioModule { }
