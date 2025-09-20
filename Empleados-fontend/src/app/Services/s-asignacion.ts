import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAsignacion } from '../Interfaces/i-asignacion';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SAsignacion {
  
  private apiUrl = 'https://localhost:7278/api/AsignacionesApi';

    constructor(private http: HttpClient) {}

    getAll(): Promise<IAsignacion[]> {
      return firstValueFrom(this.http.get<IAsignacion[]>(this.apiUrl));
    }

    getById(id: number): Promise<IAsignacion> {
      return firstValueFrom(this.http.get<IAsignacion>(`${this.apiUrl}/${id}`))
        .catch(error => {
          this.manejoErrores(error);
          throw error;
        });
    }

  create(tercero: IAsignacion): Promise<IAsignacion> {
    return firstValueFrom(this.http.post<IAsignacion>(this.apiUrl, tercero))
      .catch(error => {
        this.manejoErrores(error);
        throw error;
      });
  }

  update(cliente: IAsignacion): Promise<IAsignacion> {
    return firstValueFrom(this.http.put<IAsignacion>(`${this.apiUrl}/${cliente.id}`, cliente))
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
