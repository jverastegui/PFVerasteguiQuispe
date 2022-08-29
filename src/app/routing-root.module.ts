import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';


const rutas: Routes = [
  {
    path: 'ist',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  } ,  { path: '', redirectTo: '/core/Login', pathMatch:'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forRoot(rutas)
  ],
  exports:[RouterModule]
})
export class RoutingRootModule { }
