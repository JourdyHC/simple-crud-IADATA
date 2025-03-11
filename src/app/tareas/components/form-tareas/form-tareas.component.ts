import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TareasService } from '../../../services/tareas.service';
import { Tarea } from '../../../interfaces/tarea';
import { GenericService } from '../../../services/generic.service';
import { alertService } from '../../../util/alert.service';
import { routes } from '../../../app.routes';
import { Dialog } from '@angular/cdk/dialog';

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
  //id de tarea que enviamos
  id!: number;

  //Formulario
  formTareas!:FormGroup;
  formBuilder = inject(FormBuilder);
  
  //Base de datos
  tareasService = inject(TareasService);
  alertService = inject(alertService);

  //enrutado
  router = inject(Router);

  //capturar el id
  route = inject(ActivatedRoute);


  ngOnInit(){

    this.inicializarFormulario();

    this.route.params.subscribe(data=>{
      this.id = data['id'];
      if(this.id){
        this.tareasService.findById(this.id).subscribe(data=>this.llenarFormulario(data));
      }
    });
  }

  inicializarFormulario(){
    this.formTareas = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion:'',
      horasEstimadas: 0,
      fechaLimite: null,
      estado: 'Pendiente' 
    });
  }

  llenarFormulario(data: Tarea){
    this.formTareas = this.formBuilder.group({
      titulo: [data.titulo, Validators.required],
      descripcion: data.descripcion,
      horasEstimadas: data.horasEstimadas,
      fechaLimite: data.fechaLimite,
      estado: data.estado
    });
  }

  //POST
  crearTarea(){

    const tarea:Tarea = {
      titulo: this.formTareas.value.titulo,
      descripcion: this.formTareas.value.descripcion,
      horasEstimadas: this.formTareas.value.horasEstimadas,
      fechaLimite: this.formTareas.value.fechaLimite,
      estado: this.formTareas.value.estado
    }

    this.tareasService.save(tarea).subscribe(data=>{
      this.alertService.success();
      this.router.navigate(['/tareas']);
    });
  }

  //PUT
  actualizarTarea(){

    const tarea:Tarea = {
      titulo: this.formTareas.value.titulo,
      descripcion: this.formTareas.value.descripcion,
      horasEstimadas: this.formTareas.value.horasEstimadas,
      fechaLimite: this.formTareas.value.fechaLimite,
      estado: this.formTareas.value.estado
    }

    this.tareasService.update(this.id, tarea).subscribe(data=>{
      this.alertService.success();
      this.router.navigate(['/tareas']);
    });
  }

}
