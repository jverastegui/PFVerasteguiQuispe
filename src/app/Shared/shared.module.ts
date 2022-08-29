import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './Content/nav-bar/nav-bar.component';
import { NombreCompletoPipe } from './Pipes/nombre-completo.pipe';
import { TamanioTituloDirective } from './Directivas/tamanio-titulo.directive';
import { ToastComponent } from './Content/toast/toast.component';
import { ToastsContainer } from './Content/toast/toasts-container';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent  ,
    ToastsContainer ,
    ToastComponent,
    NombreCompletoPipe,
    TamanioTituloDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    //BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    NavBarComponent  ,
    ToastsContainer ,
    ToastComponent,
    NombreCompletoPipe,
    TamanioTituloDirective,
    FontAwesomeModule,
    HttpClientModule,
    //BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
