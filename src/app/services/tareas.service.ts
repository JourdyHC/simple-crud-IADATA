import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Tarea } from "../interfaces/tarea";
import { GenericService } from "./generic.service";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class TareasService extends GenericService<Tarea>{
  private TareaChange: Subject<Tarea[]>=new Subject<Tarea[]>;
  private messageChange: Subject<string>=new Subject<string>;

  constructor( protected override http: HttpClient) { 
     super(http, `${environment.HOST}/tarea`)
  }

  setTareaChange(data:Tarea[]){
    this.TareaChange.next(data);
  }

  getTareaChange(){
    return this.TareaChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
