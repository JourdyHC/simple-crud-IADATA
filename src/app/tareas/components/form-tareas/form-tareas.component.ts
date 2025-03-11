import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TareasService } from '../../../services/tareas.service';
import { Tarea } from '../../../interfaces/tarea';
import { GenericService } from '../../../services/generic.service';
import { alertService } from '../../../util/alert.service';

@Component({
  selector: 'app-form-tareas',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule 
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-tareas.component.html',
  styleUrl: './form-tareas.component.css'
})
export class FormTareasComponent {
  //Formulario
  formTareas!:FormGroup;
  formBuilder = inject(FormBuilder);
  
  //Base de datos
  tareasService = inject(TareasService);
  alertService = inject(alertService);

  constructor(
    // private tareasService:TareasService,
  ){}


  ngOnInit(){
    this.formTareas = this.formBuilder.group({
      titulo: '',
      descripcion:'',
      horasEstimadas: 0,
      fechaLimite: null,
      estado: 'Pendiente'
    });
  }

  crearTarea(){
    const tarea:Tarea = {
      titulo: this.formTareas.value.titulo,
      descripcion: this.formTareas.value.descripcion,
      horasEstimadas: this.formTareas.value.horasEstimadas,
      fechaLimite: this.formTareas.value.fechaLimite,
      estado: this.formTareas.value.estado
    }
    console.log(tarea);
  }

}
