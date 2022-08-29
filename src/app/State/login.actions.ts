import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from '../Shared/Models/usuario-model';
import { SesionModel } from '../Shared/Models/sesion-model';


export const IniciarSesion = createAction(
  '[Login] Iniciar Sesion',
  props<{ userName: string, password:string }>()
);

export const GuardarDatosUsuario = createAction(
  '[Login] GuardarDatosUsuario',
  props<{ tipo:string, user: SesionModel }>()
);




