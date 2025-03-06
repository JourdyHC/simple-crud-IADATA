import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-page-tareas',
  imports: [
    RouterOutlet,
    MatButtonModule
  ],
  templateUrl: './page-tareas.component.html',
  styleUrl: './page-tareas.component.css'
})
export class PageTareasComponent {

}
