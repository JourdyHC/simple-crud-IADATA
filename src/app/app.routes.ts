import { Routes } from '@angular/router';
import { PageTareasComponent } from './tareas/pages/page-tareas/page-tareas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'tareas',
        pathMatch: 'full'
    },
    {
        path: 'tareas',
        component: PageTareasComponent,
        loadChildren: () => import('./tareas/tareas.routes').then(m => m.TAREAS_ROUTES)
    }
];
