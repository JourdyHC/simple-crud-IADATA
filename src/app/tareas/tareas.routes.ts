import { Routes } from '@angular/router';
import { TablaTareasComponent } from './components/tabla-tareas/tabla-tareas.component';
import { FormTareasComponent } from './components/form-tareas/form-tareas.component';

export const TAREAS_ROUTES: Routes = [
    {
        path: '',
        children:[
            {
                path:"",
                component:TablaTareasComponent
            },
            {
                path:"new",
                component:FormTareasComponent
            },
            {
                path:"edit/:id",
                component:FormTareasComponent
            }
        ]
    },
];
