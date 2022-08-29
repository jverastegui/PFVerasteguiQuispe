import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ToastService } from 'src/app/Shared/Content/toast/toast-service';

import { AlumnoService } from '../../../Shared/Services/alumno.service';
import { interval, map, take, Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlumnoModel } from 'src/app/Shared/Models/alumno-model';
import { TipodocumentoModel } from '../../../Shared/Models/tipodocumento-model';
import { DatePipe } from '@angular/common';
import { SwalService } from 'src/app/Shared/Content/SweetAlert/swal.service';
import { LoginService } from '../../../Shared/Services/login.service';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit, OnDestroy {

  public formulario: FormGroup;
  public NombreBuscar: string = '';
  //public FlagBuscar:boolean=false;
  public ListaAlumnos: Array<AlumnoModel> = [];
  public ListaBusquedaAlumnos: Array<AlumnoModel> = [];
  public ListaTipoDocumento: Array<TipodocumentoModel> = [];
  public tituloModal: string = '';
  public IndexEdit: number = -1;
  private suscripcionRead: Subscription;
  private suscripcionEdit: Subscription;
  private suscripcionAdd: Subscription;
  private suscripcionDelete: Subscription;
  private suscripcioTipoDoc: Subscription;
  private suscripcionFiltro: Subscription;
  public ObsAlumnos: Observable<AlumnoModel[]>;


  constructor(private fb: FormBuilder, config: NgbModalConfig,
    private modalService: NgbModal,
    public ServLogin: LoginService,
    public ServAlumno: AlumnoService, private datePipe: DatePipe, private swal: SwalService) {
    this.formulario = fb.group({
      IdAlumno: [0],
      Nombres: ['', [Validators.required]],
      ApellidoPaterno: ['', [Validators.required]],
      ApellidoMaterno: ['', [Validators.required]],
      Edad: ['', [Validators.required, Validators.min(1)]],
      Sexo: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      FechaNacimiento: ['', [Validators.required]],
      TipoDocumento: ['', [Validators.required]],
      NroDocumento: ['', [Validators.required]]
    });

    config.backdrop = 'static';
    config.keyboard = false;



  }
  ngOnDestroy(): void {
    
    //this.suscripcionRead.unsubscribe();
    if (this.suscripcionEdit) this.suscripcionEdit.unsubscribe();
    if (this.suscripcionAdd) this.suscripcionAdd.unsubscribe();
    if (this.suscripcionDelete) this.suscripcionDelete.unsubscribe();
    if (this.suscripcionFiltro) this.suscripcionFiltro.unsubscribe();
    if (this.suscripcioTipoDoc) this.suscripcioTipoDoc.unsubscribe();
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.tituloModal = 'Registrar Alumno';
    this.formulario.reset();
  }



  ngOnInit(): void {
    this.ObsAlumnos = this.ServAlumno.getAllAlumnos();
    this.ListaTipoDocumento = [];
    this.suscripcioTipoDoc = this.ServAlumno.getTipoDocumento().subscribe(x => {
      this.ListaTipoDocumento = x;
    });

  }

 

  LimpiarBusqueda() {

    this.NombreBuscar = '';
    this.ngOnInit();
  }

  changeBuscar($event: any) {
    this.NombreBuscar = $event;

    if (this.NombreBuscar.length == 0) {
      this.ngOnInit();
    } else {
      this.FiltrarAlumnos();
    }

  }

  FiltrarAlumnos() {
    this.ObsAlumnos = this.ServAlumno.BuscarAlumno(this.NombreBuscar)
  }




  EliminarAlumno(Id?: number) {
    this.swal.Question('Eliminar Registro', '¿Desea Eliminar el registro seleccionado?').then(x => {
      if (x.isConfirmed) {
        this.suscripcionDelete = this.ServAlumno.EliminarAlumno(Id ?? 0).subscribe(x => {
          this.LimpiarBusqueda();
        });
      }
    })

  }


  EditarAlumno(alumno: AlumnoModel, content: any) {


    if (alumno != undefined && alumno != null) {
      this.formulario.controls["IdAlumno"].setValue(alumno.idAlumno);
      this.formulario.controls["Nombres"].setValue(alumno.nombres);
      this.formulario.controls["ApellidoPaterno"].setValue(alumno.apellidoPaterno);
      this.formulario.controls["ApellidoMaterno"].setValue(alumno.apellidoMaterno);
      this.formulario.controls["Edad"].setValue(alumno.edad);
      this.formulario.controls["Sexo"].setValue(alumno.sexo);
      this.formulario.controls["Email"].setValue(alumno.email);
      this.formulario.controls["TipoDocumento"].setValue(alumno.idTipoDocumento);
      this.formulario.controls["NroDocumento"].setValue(alumno.nroDocumento);

      if (alumno.fechaNacimiento) this.formulario.controls["FechaNacimiento"].setValue(this.datePipe.transform(new Date(alumno.fechaNacimiento), 'yyyy-MM-dd'));
      


      this.tituloModal = 'Actualizar Registro de Alumno';

      this.modalService.open(content, { size: 'lg' });
    }
  }

  cerrar() {

    this.modalService.dismissAll();
  }

  submit($event: any) {
   
    if (this.formulario.valid) {
      let EditIdAlumno = this.formulario.value.IdAlumno ?? 0;

      if (EditIdAlumno == 0) {
        let item: AlumnoModel = {
          idAlumno: 0,
          nombres: this.formulario.value.Nombres,
          apellidoPaterno: this.formulario.value.ApellidoPaterno,
          apellidoMaterno: this.formulario.value.ApellidoMaterno,
          edad: this.formulario.value.Edad,
          sexo: this.formulario.value.Sexo,
          email: this.formulario.value.Email,
          idTipoDocumento: this.formulario.value.TipoDocumento,
          nroDocumento: this.formulario.value.NroDocumento,
          fechaNacimiento: new Date(this.formulario.value.FechaNacimiento)
        };

        this.suscripcionAdd = this.ServAlumno.AgregarAlumno(item).subscribe(x => {

          this.formulario.reset();
          this.modalService.dismissAll();

          this.LimpiarBusqueda();
          this.swal.ToastSuccess('Se registro correctamente el alumno.');


        },err=>{
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      } else {

        let item: AlumnoModel = {
          idAlumno: EditIdAlumno,
          nombres: this.formulario.value.Nombres,
          apellidoPaterno: this.formulario.value.ApellidoPaterno,
          apellidoMaterno: this.formulario.value.ApellidoMaterno,
          edad: this.formulario.value.Edad,
          sexo: this.formulario.value.Sexo,
          email: this.formulario.value.Email,
          idTipoDocumento: this.formulario.value.TipoDocumento,
          nroDocumento: this.formulario.value.NroDocumento,
          fechaNacimiento: new Date(this.formulario.value.FechaNacimiento)
        };

        this.suscripcionEdit = this.ServAlumno.EditarAlumno(item).subscribe(result => {

          this.formulario.reset();
          this.modalService.dismissAll();
          this.LimpiarBusqueda();
         
          
          this.swal.ToastSuccess('Se actualizo correctamente el alumno');

        },
        err=> {
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      }

    }
  }


}

