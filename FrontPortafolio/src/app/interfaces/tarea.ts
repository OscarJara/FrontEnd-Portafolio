import { Usuario } from './usuario';

export interface Tarea {
    nombre: string;
    estado: number;
    detalle: string;
    fechaInicio: Date;
    fechaFin: Date;
    usuariosAsociados: Usuario[];
    subTareas: Tarea[];
}
