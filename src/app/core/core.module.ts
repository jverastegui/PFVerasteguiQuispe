import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SharedModule } from '../Shared/shared.module';
import { RoutingViewComponent } from './routing-view/routing-view.component';
import { RoutingModule } from './routing.module';
import { FeatureAlumnoModule } from './Alumno/feature-alumno.module';
import { FeatureCursoModule } from './Curso/feature-curso.module';
import { LoginModuleModule } from './Login/login-module.module';



@NgModule({
  declarations: [
    RoutingViewComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class CoreModule { }
