import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './Shared/shared.module';
import { RoutingRootModule } from './routing-root.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './State/login.reducer';
import { LoginEffects } from './State/login.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    RoutingRootModule,
    StoreModule.forRoot({
      login: reducer
    }),
    EffectsModule.forRoot([LoginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, autoPause:false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
