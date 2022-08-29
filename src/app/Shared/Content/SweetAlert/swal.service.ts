import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';  

@Injectable({
  providedIn: 'root'
})
export class SwalService {

 
  constructor() { }

  ToastSuccess(msj:string){
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).fire({
      icon: 'success',
      title:msj
    })
  }

  ToastError(msj:string){
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).fire({
      icon: 'error',
      title:msj
    })
  }

  Success(title:string,msj:string){
    Swal.fire(title,msj, 'success');
  }

  Warning(title:string,msj:string){
    Swal.fire(title,msj, 'warning');
  }

  Error(title:string,msj:string){
    Swal.fire(title,msj, 'error');
  }

  Question(title:string,msj:string){
    return Swal.fire({  
      title: title,  
      text: msj,  
      icon: 'question',  
      showCancelButton: true,  
      confirmButtonText: 'Confirmar',  
      cancelButtonText: 'Cancelar'  
    });
  }

}
