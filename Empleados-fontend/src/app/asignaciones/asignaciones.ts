import { Component } from '@angular/core';
import { IAsignacion } from '../Interfaces/i-asignacion';
import { SAsignacion } from '../Services/s-asignacion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asignaciones',
  imports: [RouterLink],
  templateUrl: './asignaciones.html',
  styleUrl: './asignaciones.css'
})
export class Asignaciones {
  lista_asignados$!: IAsignacion[];
   
    constructor(private asignacionServicio: SAsignacion) {}
   
    ngOnInit() {
      this.cargaTabla();
    }
    cargaTabla(): void {
      this.asignacionServicio.getAll()
        .then((asignados) => {
          this.lista_asignados$ = asignados;
          console.log(this.lista_asignados$,document.querySelector("table"))
        })
        .catch((error) => {
          console.error('Error al cargar la tabla:', error);
        });
    } 
  
    eliminarasignacion(id: number) {
      /*
      Swal.fire({
        title: 'asignados',
        text: 'Esta seguro que desea eliminar este registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#838688ff',
        confirmButtonText: 'Eliminar!!!!!!',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.asignacionServicio.delete(id).subscribe((id) => {
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
