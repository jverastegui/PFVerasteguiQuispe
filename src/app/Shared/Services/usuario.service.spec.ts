import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController,} from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment.prod';
import { UsuarioModel } from '../Models/usuario-model';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let Api=environment.baseUrl +  'usuario/';
  let httpController: HttpTestingController;
 

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(UsuarioService);
    httpController = TestBed.inject(HttpTestingController);
   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test de Edicion Usuario', () => {
    const request:UsuarioModel=
    {
      idUsuario: 3, 
      nombres: "Jeferson Jose", 
      apellidoPaterno: "Verastegui", 
      apellidoMaterno: "Quispe",
      userName: 'jverastegui',
      password: '123',
      idRol:2
    };

    service.EditarUsuario(request).subscribe((res) => {
      expect(res).toEqual(request);
    });
    const req = httpController.expectOne({method: 'PUT',url: `${Api}${request.idUsuario}`});
    req.flush(request);
  });

  it('Test de Regisro Usuario', () => {
    const request:UsuarioModel=
    {
      idUsuario: 1333, 
      nombres: "Jeferson Jose", 
      apellidoPaterno: "Verastegui", 
      apellidoMaterno: "Quispe",
      userName: 'jverastegui2',
      password: '123',
      idRol:2
    };

    service.AgregarUsuario(request).subscribe((res) => {
      expect(res).toEqual(request);
    });
    const req = httpController.expectOne({method: 'POST',url: Api});
    req.flush(request);
  });

  it('Test de Eliminacion Usuario', () => {
   

    service.EliminarUsuario(3).subscribe((res) => {
      expect(true).toBeTrue();
    }, (error)=>{
      expect(false).toBeTrue();
    });
    const req = httpController.expectOne({method: 'DELETE',url: `${Api}${3}`  });
    req.flush(true);
  });

  it('Test de Lista Usuario', () => {
    
    const mockResponse: Array<UsuarioModel>=[
      {"idUsuario":1,
      "nombres":"Admin",
      "apellidoPaterno":"Admin",
      "apellidoMaterno":"Admin",
      "userName":"admin",
      "password":"12345678",
      "idRol":1,"rol":{"idRol":1,"nombre":"Administrador"}
    },
      {"idUsuario":3,
      "nombres":"Jeferson",
      "apellidoPaterno":"Verastegui",
      "apellidoMaterno":"Quispe",
      "userName":"jverastegui",
      "password":"123",
      "idRol":2,
      "rol":{"idRol":2,"nombre":"Usuario"}
    }];

    service.getAllUsuario().subscribe((res) => {
      expect(res).toBe(mockResponse);
    });
    const req = httpController.expectOne({method: 'GET',url: `${Api}`  });
    req.flush(mockResponse);
  });




});
