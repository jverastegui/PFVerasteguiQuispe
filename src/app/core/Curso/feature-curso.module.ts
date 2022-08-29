import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RegistroCursoComponent } from './registro-curso/registro-curso.component';
import { RoutingCursoModule } from './routing-curso.module';
import { SharedModule } from '../../Shared/shared.module';



@NgModule({
  declarations: [RegistroCursoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RoutingCursoModule
  ],
  providers: [DatePipe]
})
export class FeatureCursoModule { }
