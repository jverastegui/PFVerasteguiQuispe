import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { SwalService } from 'src/app/Shared/Content/SweetAlert/swal.service';
import { CursoService } from '../../../Shared/Services/curso.service';
import { CursoModel } from '../../../Shared/Models/curso-model';
import { filter } from 'rxjs/operators';
import { LoginService } from '../../../Shared/Services/login.service';

@Component({
  selector: 'app-registro-curso',
  templateUrl: './registro-curso.component.html',
  styleUrls: ['./registro-curso.component.css']
})
export class RegistroCursoComponent implements OnInit,OnDestroy {

  private suscripcionEdit: Subscription;
  private suscripcionAdd: Subscription;
  private suscripcionDelete: Subscription;
  private suscripcioTipoDoc: Subscription;
  private suscripcionFiltro: Subscription;
  public ObsCursos: Observable<CursoModel[]>;
  public tituloModal: string = '';
  public formulario: FormGroup;
  public NombreBuscar: string = '';

  constructor(private fb: FormBuilder, config: NgbModalConfig,
    private modalService: NgbModal,
    public ServLogin: LoginService,
    public ServCurso: CursoService, private datePipe: DatePipe, private swal: SwalService) { 
      this.formulario = fb.group({
        IdCurso: [0],
        nombreCurso: ['', [Validators.required]],
        profesor: ['', [Validators.required]],
        horasAcademicas: [0, [Validators.required]],
        horario: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaFin: ['', [Validators.required]],
        horaInicio: ['', [Validators.required]],
        horaFin: ['', [Validators.required]]
      });
      config.backdrop = 'static';
      config.keyboard = false;
    }
  ngOnDestroy(): void {
    if (this.suscripcionEdit) this.suscripcionEdit.unsubscribe();
    if (this.suscripcionAdd) this.suscripcionAdd.unsubscribe();
    if (this.suscripcionDelete) this.suscripcionDelete.unsubscribe();
    if (this.suscripcionFiltro) this.suscripcionFiltro.unsubscribe();
    if (this.suscripcioTipoDoc) this.suscripcioTipoDoc.unsubscribe();
  }

  ngOnInit(): void {
    this.ObsCursos = this.ServCurso.getAllCursos();
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.tituloModal = 'Registrar Alumno';
    this.formulario.reset();
  }

  LimpiarBusqueda() {

    this.NombreBuscar = '';
    this.ngOnInit();
  }

  
  FiltrarCurso() {
   
    this.ObsCursos = this.ServCurso.BuscarCurso(this.NombreBuscar)
  }




  EliminarCurso(Id?: number) {
    this.swal.Question('Eliminar Registro', '¿Desea Eliminar el registro seleccionado?').then(x => {
      if (x.isConfirmed) {
        this.suscripcionDelete = this.ServCurso.EliminarCurso(Id ?? 0).subscribe(x => {
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
      this.FiltrarCurso();
    }

  }

  cerrar() {

    this.modalService.dismissAll();
  }

  submit($event: any) {
   
    if (this.formulario.valid) {
      let EditIdCurso = this.formulario.value.IdCurso ?? 0;

      if (EditIdCurso == 0) {
        let item: CursoModel = {
          idCurso: 0,
          nombreCurso: this.formulario.value.nombreCurso,
          profesor: this.formulario.value.profesor,
          horario: this.formulario.value.horario,
          horasAcademicas: this.formulario.value.horasAcademicas,
          fechaInicio: this.formulario.value.fechaInicio,
          fechaFin: this.formulario.value.fechaFin,
          horaInicio: (this.formulario.value.horaInicio as string).length<=5 ? this.formulario.value.horaInicio  + ':00' : this.formulario.value.horaInicio,
          horaFin: (this.formulario.value.horaFin as string).length<=5 ? this.formulario.value.horaFin  + ':00' : this.formulario.value.horaFin
        };

        this.suscripcionAdd = this.ServCurso.AgregarCurso(item).subscribe(x => {

          this.formulario.reset();
          this.modalService.dismissAll();

          this.LimpiarBusqueda();
          this.swal.ToastSuccess('Se registro correctamente el Curso.');


        },err=>{
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      } else {

        let item: CursoModel = {
          idCurso: EditIdCurso,
          nombreCurso: this.formulario.value.nombreCurso,
          profesor: this.formulario.value.profesor,
          horario: this.formulario.value.horario,
          horasAcademicas: this.formulario.value.horasAcademicas,
          fechaInicio: this.formulario.value.fechaInicio,
          fechaFin: this.formulario.value.fechaFin,
          horaInicio: (this.formulario.value.horaInicio as string).length<=5 ? this.formulario.value.horaInicio  + ':00' : this.formulario.value.horaInicio,
          horaFin: (this.formulario.value.horaFin as string).length<=5 ? this.formulario.value.horaFin  + ':00' : this.formulario.value.horaFin
        };


        this.suscripcionEdit = this.ServCurso.EditarCurso(item).subscribe(result => {

          this.formulario.reset();
          this.modalService.dismissAll();
          this.LimpiarBusqueda();
         
          
          this.swal.ToastSuccess('Se actualizo correctamente el Curso.');

        },
        err=> {
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      }

    }
  }

  EditarCurso(curso: CursoModel, content: any) {


    if (curso != undefined && curso != null) {
      this.formulario.controls["IdCurso"].setValue(curso.idCurso);
      this.formulario.controls["nombreCurso"].setValue(curso.nombreCurso);
      this.formulario.controls["profesor"].setValue(curso.profesor);
      this.formulario.controls["horasAcademicas"].setValue(curso.horasAcademicas);
      this.formulario.controls["horario"].setValue(curso.horario);
      this.formulario.controls["fechaInicio"].setValue(this.datePipe.transform(new Date(curso.fechaInicio), 'yyyy-MM-dd'));
      this.formulario.controls["fechaFin"].setValue(this.datePipe.transform(new Date(curso.fechaFin), 'yyyy-MM-dd'));
      this.formulario.controls["horaInicio"].setValue(curso.horaInicio);
      this.formulario.controls["horaFin"].setValue(curso.horaFin);
      



      this.tituloModal = 'Actualizar Registro de Curso';

      this.modalService.open(content, { size: 'lg' });
    }
  }

}
