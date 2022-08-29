import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SesionModel } from '../../Models/sesion-model';
import { LoginService } from '../../Services/login.service';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {  GuardarDatosUsuario } from 'src/app/State/login.actions';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,OnDestroy {

  closeResult = '';
  private suscriptor:Subscription;
  public nombreusuario:string='';
  public IsAdmin:boolean=false;

  constructor( private router: Router,private store:Store,private offcanvasService: NgbOffcanvas, public login:LoginService) {}
  ngOnDestroy(): void {
    if(this.suscriptor)  this.suscriptor.unsubscribe();
  }

  open(content:any) {
    this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  CerrarSesion() {
    let obj:SesionModel=JSON.parse(sessionStorage.getItem('UserData') ?? '{}') as SesionModel;
    if((obj.idSession??0) >0){
      this.suscriptor=this.login.CerrarSesion((obj.idSession??0)).pipe(catchError(() => EMPTY)).subscribe(x=>{
        sessionStorage.removeItem('UserData');
      });
    }
   let initialState: SesionModel  = {
      idSession: 0,
      idUsuario: null,
      token: null,
      usuario: null
    };
   
    this.store.dispatch(GuardarDatosUsuario({tipo:'cerrar',user:initialState}));
    this.login.NombreUsuario='';
    sessionStorage.removeItem('UserData');
    this.login.ValidateIsAdmin();
    this.router.navigate(['core','Login']);
    
  }


  ngOnInit(): void {
    
  }

 

}
