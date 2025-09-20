import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmpleado } from '../Interfaces/i-empleado';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SEmpleado {
  private apiUrl = 'https://localhost:7278/api/EmpleadosApi';

  constructor(private http: HttpClient) {}

  getAll(): Promise<IEmpleado[]> {
    return firstValueFrom(this.http.get<IEmpleado[]>(this.apiUrl));
  }

  getById(id: number): Promise<IEmpleado> {
    return firstValueFrom(this.http.get<IEmpleado>(`${this.apiUrl}/${id}`))
      .catch(error => {
        this.manejoErrores(error);
        throw error;
      });
  }

create(tercero: IEmpleado): Promise<IEmpleado> {
  return firstValueFrom(this.http.post<IEmpleado>(this.apiUrl, tercero))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}

update(cliente: IEmpleado): Promise<IEmpleado> {
  return firstValueFrom(this.http.put<IEmpleado>(`${this.apiUrl}/${cliente.id}`, cliente))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}

delete(id: number): Promise<number> {
  return firstValueFrom(this.http.delete<number>(`${this.apiUrl}/${id}`))
    .catch(error => {
      this.manejoErrores(error);
      throw error;
    });
}

manejoErrores(error: any): void {
    const msg = error?.error?.message || error?.statusText || 'Error de red';
    console.error('Error:', msg);
  }
}
