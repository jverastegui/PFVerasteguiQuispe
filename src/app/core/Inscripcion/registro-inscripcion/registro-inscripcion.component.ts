import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, Subscription } from 'rxjs';
import { SwalService } from 'src/app/Shared/Content/SweetAlert/swal.service';
import { InscripcionModel } from '../../../Shared/Models/inscripcion-model';
import { InscripcionService } from '../../../Shared/Services/inscripcion.service';
import { CursoService } from '../../../Shared/Services/curso.service';
import { AlumnoService } from '../../../Shared/Services/alumno.service';
import { CursoModel } from '../../../Shared/Models/curso-model';
import { AlumnoModel } from '../../../Shared/Models/alumno-model';
import { LoginService } from '../../../Shared/Services/login.service';

@Component({
  selector: 'app-registro-inscripcion',
  templateUrl: './registro-inscripcion.component.html',
  styleUrls: ['./registro-inscripcion.component.css']
})
export class RegistroInscripcionComponent implements OnInit, OnDestroy {

  private suscripcionEdit: Subscription;
  private suscripcionAdd: Subscription;
  private suscripcionDelete: Subscription;
  private suscripcioTipoDoc: Subscription;
  private suscripcionFiltro: Subscription;
  public ObsCursos: Observable<CursoModel[]>;
  public ObsInscripcion: Observable<InscripcionModel[]>;
  public ObsAlumnos: Observable<AlumnoModel[]>;
  public tituloModal: string = '';
  public formulario: FormGroup;
  public NombreBuscar: string = '';
  public IdAlumnoIns:number=0;

  constructor(private fb: FormBuilder, config: NgbModalConfig,
    private modalService: NgbModal,
    public ServCurso: CursoService,
    public ServAlumno: AlumnoService,
    public ServLogin:LoginService,
    public ServInscripcion: InscripcionService, private datePipe: DatePipe, private swal: SwalService) {

    this.formulario = fb.group({
      IdCurso: [0, [Validators.required]],
      IdAlumno: [0, [Validators.required,Validators.min(1)]],
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

  changeInscripcionCursos($event:any){
     this.IdAlumnoIns=$event;
     this.ObsCursos=this.ServInscripcion.GetCursosDisponibles(this.IdAlumnoIns);
     this.ObsInscripcion=this.ServInscripcion.getAllInscripcionesByAlumno(this.IdAlumnoIns);
  }
 

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
    this.tituloModal = 'Registrar Inscripcion';
    this.formulario.reset();
  }

  LimpiarBusqueda() {

    this.NombreBuscar = '';
    this.ObsCursos=this.ServInscripcion.GetCursosDisponibles(this.IdAlumnoIns);
    this.ObsInscripcion=this.ServInscripcion.getAllInscripcionesByAlumno(this.IdAlumnoIns);
  }
  ngOnInit(): any {
    this.ObsAlumnos = this.ServAlumno.getAllAlumnos();
    //this.ObsCursos = this.ServInscripcion.GetCursosDisponibles();
    //this.ObsInscripcion=this.ServInscripcion.getAllInscripcionesByAlumno(1);
  }


  



  EliminarInscripcion(Id?: number) {
    this.swal.Question('Eliminar Inscripcion', '¿Desea Eliminar el registro seleccionado?').then(x => {
      if (x.isConfirmed) {
        this.suscripcionDelete = this.ServInscripcion.EliminarInscripcion(this.IdAlumnoIns,Id??0 ).subscribe(x => {
          this.LimpiarBusqueda();
        });
      }
    })

  }

  changeBuscar($event: any) {
    this.NombreBuscar = $event;

    if (this.NombreBuscar.length == 0) {
      this.ObsCursos=this.ServInscripcion.GetCursosDisponibles(this.IdAlumnoIns);
    } else {
      this.ObsCursos=this.ServInscripcion.SearchCursosDisponibles(this.IdAlumnoIns,this.NombreBuscar);
    }

  }

  cerrar() {

    this.modalService.dismissAll();
  }

  AgregarInscripcion(IdCurso:number) {

   
      if (this.IdAlumnoIns> 0) {
        let item: InscripcionModel = {
          idCurso: IdCurso,
          idAlumno:this.IdAlumnoIns
         
        };

        this.suscripcionAdd = this.ServInscripcion.AgregarInscripcion(item).subscribe(x => {

          //this.formulario.reset();
          //this.modalService.dismissAll();

          this.LimpiarBusqueda();
          this.swal.ToastSuccess('Se registro correctamente la Inscripcion.');


        }, err => {
          this.swal.ToastError('Ocurrio un error al procesar la solicitud.');
        });

      

    }
  }

  
  }


