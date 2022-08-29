import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { SesionModel } from '../Shared/Models/sesion-model';

export const loginFeatureKey = 'login';

// export interface State {
   
// }

export const initialState: SesionModel  = {
  idSession: 0,
  idUsuario: null,
  token: null,
  usuario: null
};

export const reducer = createReducer(
  initialState,
  on(LoginActions.GuardarDatosUsuario, (state, {tipo,user}) => {
    if(tipo=='login'){
      sessionStorage.setItem('IsSuccessLogin','1');
      return user;
    }else{
      sessionStorage.removeItem('IsSuccessLogin');
      return initialState;
    }
  }),

);

