import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class alertService {
  confirmAction(action: () => void, message: string = '¿Estás seguro?'): void {
    Swal.fire({
      title: message,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        action(); 
        Swal.fire({
          title: 'Completado!',
          text: 'La acción se realizó exitosamente.',
          icon: 'success',
          timer: 1000,
        });
      }
    });
  }
  
  success(){
    Swal.fire({
      title: 'Completado!',
      text: 'La acción se realizó exitosamente.',
      icon: 'success',
      timer: 1000,
    });
  }
}
