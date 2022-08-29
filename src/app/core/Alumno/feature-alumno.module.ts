import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RegistroAlumnoComponent } from './registro-alumno/registro-alumno.component';
import { SharedModule } from '../../Shared/shared.module';
import { RoutingAlumnoModule } from './routing-alumno.module';



@NgModule({
  declarations: [RegistroAlumnoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RoutingAlumnoModule
  ],
  providers: [DatePipe]
})
export class FeatureAlumnoModule { }
