import { Component } from '@angular/core';
import { IEmpleado } from '../Interfaces/i-empleado';
import { SEmpleado } from '../Services/s-empleado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empleados',
  imports: [RouterLink],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class Empleados {

  lista_empleados$!: IEmpleado[];
 
  constructor(private empleadoServicio: SEmpleado) {}
 
  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla(): void {
    this.empleadoServicio.getAll()
      .then((empleados) => {
        this.lista_empleados$ = empleados;
        //console.log(this.lista_empleados$,document.querySelector("table"))
      })
      .catch((error) => {
        console.error('Error al cargar la tabla:', error);
      });
  } 

  eliminarEmpleado(id: number) {
    /*
    Swal.fire({
      title: 'empleados',
      text: 'Esta seguro que desea eliminar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#838688ff',
      confirmButtonText: 'Eliminar!!!!!!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.empleadoServicio.delete(id).subscribe((id) => {
          if (id > 0) {
            this.cargaTabla();
            Swal.fire(
              'Cliente Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    })*/
  }
  
}
