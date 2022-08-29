import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAlumnoComponent } from './Alumno/registro-alumno/registro-alumno.component';
import { RegistroCursoComponent } from './Curso/registro-curso/registro-curso.component';
import { RoutingViewComponent } from './routing-view/routing-view.component';
import { IniciarSesionComponent } from './Login/iniciar-sesion/iniciar-sesion.component';
import { LoginValidationGuard } from '../Shared/Guard/login-validation.guard';
import { RolValidationGuard } from '../Shared/Guard/rol-validation.guard';



const rutas: Routes = [
  {
    path: 'core',
    component: RoutingViewComponent,
    children: [
      { path: 'Login', loadChildren:()=> import("./Login/login-module.module").then((m)=> m.LoginModuleModule) },
      { path: 'RegistroAlumno',canActivate:[LoginValidationGuard], loadChildren:()=> import("./Alumno/feature-alumno.module").then((m)=> m.FeatureAlumnoModule) },
      { path: 'RegistroCurso',canActivate:[LoginValidationGuard], loadChildren:()=> import("./Curso/feature-curso.module").then((m)=> m.FeatureCursoModule) },
      { path: 'RegistroInscripcion',canActivate:[LoginValidationGuard], loadChildren:()=> import("./Inscripcion/inscripcion.module").then((m)=> m.InscripcionModule) },
      { path: 'RegistroUsuario',canActivate:[LoginValidationGuard, RolValidationGuard], loadChildren:()=> import("./Usuario/usuario.module").then((m)=> m.UsuarioModule) }
    ]
  } //, { path: '', redirectTo: '/core/Login', pathMatch:'full'} canActivate:[LoginValidationGuard],  canActivate:[LoginValidationGuard],
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
