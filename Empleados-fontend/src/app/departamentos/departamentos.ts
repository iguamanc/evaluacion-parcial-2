import { Component } from '@angular/core';
import { SDepartamento } from '../Services/s-departamento';
import { IDepartamentos } from '../Interfaces/i-departamentos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  imports: [RouterLink],
  templateUrl: './departamentos.html',
  styleUrl: './departamentos.css'
})
export class Departamentos {
  lista_departamentos$!: IDepartamentos[];
   
    constructor(private departamentoServicio: SDepartamento) {}
   
    ngOnInit() {
      this.cargaTabla();
    }
    cargaTabla(): void {
      this.departamentoServicio.getAll()
        .then((empleados) => {
          this.lista_departamentos$ = empleados;
          console.log(this.lista_departamentos$,document.querySelector("table"))
        })
        .catch((error) => {
          console.error('Error al cargar la tabla:', error);
        });
    }

    eliminarDepartamento(id: number){

    }


}
