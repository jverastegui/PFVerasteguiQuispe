import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';
import { SesionModel } from '../Shared/Models/sesion-model';

export const selectLoginState = createFeatureSelector<SesionModel>(
  fromLogin.loginFeatureKey
);
