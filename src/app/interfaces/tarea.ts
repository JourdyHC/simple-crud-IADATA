export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    horasEstimadas: string;
    fechaLimite: Date;
    estado: "Pendiente" | "En progreso" | "Completada"
  }
  