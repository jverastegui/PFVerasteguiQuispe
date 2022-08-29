import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { IniciarSesionComponent } from './iniciar-sesion.component';
import { SesionModel } from '../../../Shared/Models/sesion-model';
import { SharedModule } from '../../../Shared/shared.module';

import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../../../Shared/Services/login.service';
import { SwalService } from '../../../Shared/Content/SweetAlert/swal.service';
import { UsuarioModel } from '../../../Shared/Models/usuario-model';
import { delay } from "rxjs/operators";
import { CoreModule } from '../../core.module';
import { of } from 'rxjs';



describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;
  let service: LoginService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarSesionComponent ],
      imports:[SharedModule,CoreModule, RouterTestingModule],
      providers:[LoginService,SwalService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    service = TestBed.inject(LoginService);
  });

it("Validar definicion del metodo submit", () => {
    expect(component.submit).toBeDefined();
});

it('Validar Login usuario: jverastegui', fakeAsync( () => {

  const fixture = TestBed.createComponent(IniciarSesionComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(LoginService);
    component.formulario.controls["UserName"].setValue('jverastegui');
    component.formulario.controls["Password"].setValue('123');
    component.IsTest=true;
    fixture.detectChanges();
    let item:SesionModel={
      idSession:4,
      idUsuario:3,
      token:"ce67fb1c-7706-4f76-8d73-e5802c674401",
      usuario:{
        idUsuario:3,
        nombres:"Jeferson",
        apellidoPaterno:"Verastegui",
        apellidoMaterno:"Quispe",
        userName:"jverastegui",
        password:"123",
        idRol:2}
      };



    spyOn(service, 'ValidateLogin').and.callFake(function(user :UsuarioModel){
        return  of(item).pipe(delay(1000));
    });

    component.submit(null);
    tick(3000);
    expect(service.NombreUsuario).toEqual('jverastegui' as any);
 
}));

});
