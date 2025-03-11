export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  horasEstimadas: string;
  fechaLimite: Date | null;
  estado: "Pendiente" | "En progreso" | "Completada"
}
