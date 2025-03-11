import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tarea } from '../../../interfaces/tarea';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogFormTareasComponent } from '../dialog-form-tareas/dialog-form-tareas.component';
import { MatDialog } from '@angular/material/dialog';
import { TareasService } from '../../../services/tareas.service';
import { alertService } from '../../../util/alert.service';

@Component({
  selector: 'app-tabla-tareas',
  imports: [
    RouterLink,
    MatCardModule, 
    MatTableModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './tabla-tareas.component.html',
  styleUrl: './tabla-tareas.component.css'
})
export class TablaTareasComponent {
  
  // Servicios de bd
  tareasService = inject(TareasService);

  //Servicio de dialogo
  readonly dialog = inject(MatDialog);

  //Alertas
  alertService = inject(alertService);

  //DataTable de material
  displayedColumns: string[] = ['position', 'titulo', 'descripcion', 'horasEstimadas', 'fechaLimite', 'estado', "acciones"];
  // dataSource = new MatTableDataSource<Tarea>(TAREAS_DATA);
  dataSource!: MatTableDataSource<Tarea>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    this.tareasService.findAll().subscribe(data=>this.crearTabla(data));
    this.tareasService.getTareaChange().subscribe(data=>this.crearTabla(data));
  }

  crearTabla(tareas:Tarea[]){
    this.dataSource = new MatTableDataSource(tareas);// Llenando los datos
    this.dataSource.paginator = this.paginator;
  }
  
  //DELETE
  eliminarTarea(id:number){
    this.alertService.confirmAction(()=>{
      this.tareasService.delete(id).subscribe(data=>{
        this.tareasService.findAll().subscribe(data=>{
          this.tareasService.setTareaChange(data);
        })
      })
    },"Está seguro");
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  abrirDialog(): void {
    const dialogRef = this.dialog.open(
      DialogFormTareasComponent, 
      // {
      //   data: null,
      // }
    );
  }
}

// const TAREAS_DATA: Tarea[] = [
//   {
//     id: 1,
//     titulo: "Implementar autenticación de usuario",
//     descripcion: "Agregar autenticación de usuario con JWT y bcrypt",
//     horasEstimadas: "8",
//     fechaLimite: new Date("2025-03-10"),
//     estado: "Pendiente"
//   },
//   {
//     id: 2,
//     titulo: "Diseñar página de inicio",
//     descripcion: "Crear un diseño atractivo para la página de inicio",
//     horasEstimadas: "5",
//     fechaLimite: new Date("2025-03-12"),
//     estado: "En progreso"
//   },
//   {
//     id: 3,
//     titulo: "Configurar base de datos",
//     descripcion: "Configurar base de datos PostgreSQL y crear tablas",
//     horasEstimadas: "6",
//     fechaLimite: new Date("2025-03-08"),
//     estado: "Pendiente"
//   },
//   {
//     id: 4,
//     titulo: "Crear API de productos",
//     descripcion: "Desarrollar endpoints CRUD para la gestión de productos",
//     horasEstimadas: "7",
//     fechaLimite: new Date("2025-03-11"),
//     estado: "Pendiente"
//   },
//   {
//     id: 5,
//     titulo: "Escribir pruebas unitarias",
//     descripcion: "Escribir pruebas unitarias para los componentes principales",
//     horasEstimadas: "4",
//     fechaLimite: new Date("2025-03-09"),
//     estado: "Completada"
//   },
//   {
//     id: 6,
//     titulo: "Optimizar rendimiento",
//     descripcion: "Optimizar el rendimiento del sitio web y reducir el tiempo de carga",
//     horasEstimadas: "5",
//     fechaLimite: new Date("2025-03-15"),
//     estado: "En progreso"
//   },
//   {
//     id: 7,
//     titulo: "Integrar pasarela de pago",
//     descripcion: "Integrar pasarela de pago con Stripe",
//     horasEstimadas: "6",
//     fechaLimite: new Date("2025-03-13"),
//     estado: "Pendiente"
//   },
//   {
//     id: 8,
//     titulo: "Implementar funcionalidad de búsqueda",
//     descripcion: "Agregar funcionalidad de búsqueda avanzada en el sitio web",
//     horasEstimadas: "4",
//     fechaLimite: new Date("2025-03-14"),
//     estado: "Pendiente"
//   },
//   {
//     id: 9,
//     titulo: "Configurar CI/CD",
//     descripcion: "Configurar integración y despliegue continuos con GitHub Actions",
//     horasEstimadas: "5",
//     fechaLimite: new Date("2025-03-16"),
//     estado: "En progreso"
//   },
//   {
//     id: 10,
//     titulo: "Realizar despliegue en producción",
//     descripcion: "Desplegar la aplicación en un entorno de producción",
//     horasEstimadas: "3",
//     fechaLimite: new Date("2025-03-18"),
//     estado: "Pendiente"
//   }
// ];
