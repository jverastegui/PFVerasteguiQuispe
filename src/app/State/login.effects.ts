import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as LoginActions from './login.actions';
import { LoginService } from '../Shared/Services/login.service';
import { GuardarDatosUsuario } from './login.actions';




@Injectable()
export class LoginEffects {
 
  loadLogins$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(LoginActions.IniciarSesion),
      mergeMap(
        (props: { userName: string, password: string }) =>
          this.loginServ.ValidateLogin({ userName: props.userName, password: props.password })
            .pipe(
              map(user => (GuardarDatosUsuario({ "tipo":"login", user:user }))),
              catchError(() => EMPTY)
            )

      )
    );
  });



  constructor(private actions$: Actions, private loginServ: LoginService) { }

}
