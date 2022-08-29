import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RegistroInscripcionComponent } from './registro-inscripcion/registro-inscripcion.component';
import { SharedModule } from '../../Shared/shared.module';
import { RoutingInscripcionModule } from './routing-inscripcion.module';



@NgModule({
  declarations: [
    RegistroInscripcionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutingInscripcionModule
  ],
  providers: [DatePipe]
})
export class InscripcionModule { }
