import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { SwalService } from 'src/app/Shared/Content/SweetAlert/swal.service';
import { RolModel } from 'src/app/Shared/Models/rol-model';
import { UsuarioModel } from '../../../Shared/Models/usuario-model';
import { UsuarioService } from '../../../Shared/Services/usuario.service';
import { AlumnoModel } from '../../../Shared/Models/alumno-model';
import { AlumnoService } from '../../../Shared/Services/alumno.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  private suscripcionEdit: Subscription;
  private suscripcionAdd: Subscription;
  private suscripcionDelete: Subscription;
 
  private suscripcionFiltro: Subscription;
  private suscripcionAlum: Subscription;
  public ObsUsuario: Observable<UsuarioModel[]>;
  public ObsRol: Observable<RolModel[]>;
  public ObsAlumnos: Observable<AlumnoModel[]>;
  public tituloModal: string = '';
  public formulario: FormGroup;
  public NombreBuscar: string = '';

  constructor(private fb: FormBuilder, config: NgbModalConfig,
    private modalService: NgbModal,
    public ServAlumno: AlumnoService,
    public ServUsuario: UsuarioService, private swal: SwalService) { 
      this.formulario = fb.group({
        IdUsuario: [0],
        Nombres: ['', [Validators.required]],
        ApellidoPaterno: ['', [Validators.required]],
        ApellidoMaterno: [0, [Validators.required]],
        Usuario: ['', [Validators.required]],
        Password: ['', [Validators.required]],
        Password2: ['', [Validators.required]],
        IdAlumno: [0],
        IdRol: [0, [Validators.required,Validators.min(1)]]
      });
      config.backdrop = 'static';
      config.keyboard = false;
    }
  ngOnDestroy(): void {
    if (this.suscripcionEdit) this.suscripcionEdit.unsubscribe();
    if (this.suscripcionAdd) this.suscripcionAdd.unsubscribe();
    if (this.suscripcionDelete) this.suscripcionDelete.unsubscribe();
    if (this.suscripcionFiltro) this.suscripcionFiltro.unsubscribe();
    if (this.suscripcionAlum) this.suscripcionAlum.unsubscribe();
    
  }

  ngOnInit(): void {
    this.ObsUsuario = this.ServUsuario.getAllUsuario();
    this.ObsRol = this.ServUsuario.GetRoles();
    this.ObsAlumnos=this.ServAlumno.getAllAlumnos();
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.tituloModal = 'Registrar Usuario';
    this.formulario.reset();
  }

  changeAlumno(e:any){
    this.suscripcionAlum= this.ServAlumno.getAlumnoById(e.target.value).subscribe(a=>{
      this.formulario.controls["Nombres"].setValue(a.nombres);
      this.formulario.controls["ApellidoPaterno"].setValue(a.apellidoPaterno);
      this.formulario.controls["ApellidoMaterno"].setValue(a.apellidoMaterno);
    });
  }

  LimpiarBusqueda() {

    this.NombreBuscar = '';
    this.ngOnInit();
  }

  
  FiltrarUsuario() {
   
    this.ObsUsuario = this.ServUsuario.BuscarUsuario(this.NombreBuscar);
  }




  EliminarUsuario(Id?: number) {
    this.swal.Question('Eliminar Usuario', '¿Desea Eliminar el registro seleccionado?').then(x => {
      if (x.isConfirmed) {
        this.suscripcionDelete = this.ServUsuario.EliminarUsuario(Id ?? 0).subscribe(x => {
          this.LimpiarBusqueda();
        });
      }
    })

  }

  changeBuscar($event: any) {
    this.NombreBuscar = $event;

    if (this.NombreBuscar.length == 0) {
      this.ngOnInit();
    } else {
      this.FiltrarUsuario();
    }

  }

  cerrar() {

    this.modalService.dismissAll();
  }

  submit($event: any) {
   
    if (this.formulario.valid) {
      if(this.formulario.value.Password!=this.formulario.value.Password2){
        this.swal.Warning('Usuario','Las constraseñas no coinciden.');
        return;
      }

      let EditIdUsuario = this.formulario.value.IdUsuario ?? 0;

      if (EditIdUsuario == 0) {
        let item: UsuarioModel = {
          idUsuario: 0,
          nombres: this.formulario.value.Nombres,
          apellidoPaterno: this.formulario.value.ApellidoPaterno,
          apellidoMaterno: this.formulario.value.ApellidoMaterno,
          userName: this.formulario.value.Usuario,
          password: this.formulario.value.Password,
          idRol: this.formulario.value.IdRol,
          idAlumno: this.formulario.value.IdAlumno
        };

        this.suscripcionAdd = this.ServUsuario.AgregarUsuario(item).subscribe(x => {

          this.formulario.reset();
          this.modalService.dismissAll();

          this.LimpiarBusqueda();
          this.swal.ToastSuccess('Se registro correctamente el Usuario.');


        },err=>{
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      } else {

        let item: UsuarioModel = {
          idUsuario: EditIdUsuario,
          nombres: this.formulario.value.Nombres,
          apellidoPaterno: this.formulario.value.ApellidoPaterno,
          apellidoMaterno: this.formulario.value.ApellidoMaterno,
          userName: this.formulario.value.Usuario,
          password: this.formulario.value.Password,
          idRol: this.formulario.value.IdRol,
          idAlumno: this.formulario.value.IdAlumno
        };


        this.suscripcionEdit = this.ServUsuario.EditarUsuario(item).subscribe(result => {

          this.formulario.reset();
          this.modalService.dismissAll();
          this.LimpiarBusqueda();
         
          
          this.swal.ToastSuccess('Se actualizo correctamente el Usuario.');

        },
        err=> {
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      }

    }
  }

  EditarUsuario(usuario: UsuarioModel, content: any) {


    if (usuario != undefined && usuario != null) {
      this.formulario.controls["IdUsuario"].setValue(usuario.idUsuario);
      this.formulario.controls["Nombres"].setValue(usuario.nombres);
      this.formulario.controls["ApellidoPaterno"].setValue(usuario.apellidoPaterno);
      this.formulario.controls["ApellidoMaterno"].setValue(usuario.apellidoMaterno);
      this.formulario.controls["Usuario"].setValue(usuario.userName);
      this.formulario.controls["Password"].setValue(usuario.password);
      this.formulario.controls["Password2"].setValue(usuario.password);
      this.formulario.controls["IdRol"].setValue(usuario.idRol);
      this.formulario.controls["IdAlumno"].setValue(usuario.idAlumno);

      this.tituloModal = 'Actualizar Registro de Usuario';

      this.modalService.open(content, { size: 'lg' });
    }
  }

}
