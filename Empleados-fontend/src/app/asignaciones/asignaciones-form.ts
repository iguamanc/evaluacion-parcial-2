import { Component, OnInit } from '@angular/core';
import { SEmpleado } from '../Services/s-empleado';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SDepartamento } from '../Services/s-departamento';

@Component({
  selector: 'app-asignaciones',
 imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './asignaciones-form.html',
  styleUrl: './asignaciones.css'
})
export class AsignacionesForm implements OnInit {

  empleadoform: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo empleado';
  id: number = 0;
  Editar: boolean = false;

  empleados: any = null;
  departamentos: any = null;


  constructor(
    private empleadoServicio: SEmpleado,
    private departamentosServicio: SDepartamento,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {

    this.empleadoServicio.getAll()
    .then(empleado => {
      this.empleados = empleado;
    })
    .catch(error => {
      console.error('Error al obtener el empleado:', error);
    });

    this.departamentosServicio.getAll()
    .then(depart => {
      this.departamentos = depart;
    })
    .catch(error => {
      console.error('Error al obtener el empleado:', error);
    });


    this.empleadoform = new FormGroup({
      
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
       apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),      

    });

    this.parametros.params.subscribe((parametros) => {
      if (parametros['id']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de empleado';
        this.id = parametros['id'];
        this.Editar = true;

      this.empleadoServicio.getById(this.id)
      .then(empleado => {
        console.log(empleado)
        this.empleadoform.patchValue(empleado);
      })
      .catch(error => {
        console.error('Error al obtener el empleado:', error);
      });

      } else {
        //nuevo empleado
        this.empleadoform.reset();
      }
    });
  }

  ngOnInit() {}

  enviar() {
    if (this.empleadoform.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del empleado?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const empleado = this.empleadoform.value;
          empleado.id = this.id;
          console.log('formData edit: ',empleado);
          
          this.empleadoServicio.update(empleado)
          .then(empleadoActualizado => {
            console.log(empleadoActualizado)
            if (empleadoActualizado == null) {
              Swal.fire('empleados', 'Error al guardar', 'error');
              return;
            }
            Swal.fire('empleados', 'Se guardó con éxito', 'success');
            this.empleadoform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('empleados', 'Error al guardar', 'error');
            console.error('Error al actualizar el empleado:', error);
          });

        } else {
          const empleado = this.empleadoform.value;
          
          console.log(empleado)

          this.empleadoServicio.create(empleado)
          .then(unempleado => {
            Swal.fire('empleados', 'Se guardó con éxito', 'success');
            this.empleadoform.reset();
            this.navegacion.navigate(['']);
          })
          .catch(error => {
            Swal.fire('empleados', 'Error al guardar', 'error');
            console.error('Error al crear el empleado:', error);
          });
         
        }
      } else if (result.isDenied) {
        Swal.fire('empleados', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
}