import { Routes } from '@angular/router';
import { Empleados } from './empleados/empleados';
import { Departamentos } from './departamentos/departamentos';
import { Asignaciones } from './asignaciones/asignaciones';
import { EmpleadoForm } from './empleados/empleado-form';
import { AsignacionesForm } from './asignaciones/asignaciones-form';

export const routes: Routes = [
  //{path:'',component:Empleados},
    {path:'empleados',component:Empleados},
    {path:'empleado/crear',component:EmpleadoForm},
    {path:'empleado/editar/:id',component:EmpleadoForm},    
    {path:'departamentos',component:Departamentos},
    {path:'asignaciones',component:Asignaciones},
    {path:'asignaciones/crear',component:AsignacionesForm},
    {path:'**',redirectTo:''}
];

