import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tarea } from '../../../interfaces/tarea';
import { PageTareasComponent } from '../../pages/page-tareas/page-tareas.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TareasService } from '../../../services/tareas.service';
import { alertService } from '../../../util/alert.service';

@Component({
  selector: 'app-dialog-form-tareas',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule 
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-form-tareas.component.html',
  styleUrl: './dialog-form-tareas.component.css'
})
export class DialogFormTareasComponent {
  //Form Dialog
  readonly dialogRef = inject(MatDialogRef<PageTareasComponent>);
  readonly data = inject<Tarea>(MAT_DIALOG_DATA);

  //Formulario
  formTareas!: FormGroup;
  formBuilder = inject(FormBuilder);

  //Base de datos
  tareasService = inject(TareasService);
  alertService = inject(alertService);

  ngOnInit(){
    this.inicializarFormulario();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  inicializarFormulario() {
    this.formTareas = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: '',
      horasEstimadas: 0,
      fechaLimite: null,
      estado: 'Pendiente'
    });
  }

  llenarFormulario(data: Tarea) {
    this.formTareas = this.formBuilder.group({
      titulo: [data.titulo, Validators.required],
      descripcion: data.descripcion,
      horasEstimadas: data.horasEstimadas,
      fechaLimite: data.fechaLimite,
      estado: data.estado
    });
  }

  //POST
  crearTarea() {

    const tarea: Tarea = {
      titulo: this.formTareas.value.titulo,
      descripcion: this.formTareas.value.descripcion,
      horasEstimadas: this.formTareas.value.horasEstimadas,
      fechaLimite: this.formTareas.value.fechaLimite,
      estado: this.formTareas.value.estado
    }

    this.tareasService.save(tarea).subscribe(data => {
      this.alertService.success();
    });
  }

  //PUT
  actualizarTarea() {

    const tarea: Tarea = {
      titulo: this.formTareas.value.titulo,
      descripcion: this.formTareas.value.descripcion,
      horasEstimadas: this.formTareas.value.horasEstimadas,
      fechaLimite: this.formTareas.value.fechaLimite,
      estado: this.formTareas.value.estado
    }

    // this.tareasService.update(this.id, tarea).subscribe(data => {
    //   this.alertService.success();
    // });
  }
}
