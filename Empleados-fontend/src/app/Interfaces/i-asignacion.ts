import { IDepartamentos } from "./i-departamentos";
import { IEmpleado } from "./i-empleado";

export interface IAsignacion {
  id: number;
  empleadosId: number;
  departamentosId: number;
  fechaAsignacion: Date;
  empleados: IEmpleado;         // No debe ser un array si representa un solo empleado
  departamentos: IDepartamentos; // Igual aquí, debe ser un objeto, no un array
}

