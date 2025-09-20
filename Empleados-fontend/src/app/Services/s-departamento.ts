import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartamentos } from '../Interfaces/i-departamentos';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SDepartamento {
  
    private apiUrl = 'https://localhost:7278/api/DepartamentosApi';

    constructor(private http: HttpClient) {}

    getAll(): Promise<IDepartamentos[]> {
      return firstValueFrom(this.http.get<IDepartamentos[]>(this.apiUrl));
    }

    getById(id: number): Promise<IDepartamentos> {
      return firstValueFrom(this.http.get<IDepartamentos>(`${this.apiUrl}/${id}`))
        .catch(error => {
          this.manejoErrores(error);
          throw error;
        });
    }

  create(tercero: IDepartamentos): Promise<IDepartamentos> {
    return firstValueFrom(this.http.post<IDepartamentos>(this.apiUrl, tercero))
      .catch(error => {
        this.manejoErrores(error);
        throw error;
      });
  }

  update(cliente: IDepartamentos): Promise<IDepartamentos> {
    return firstValueFrom(this.http.put<IDepartamentos>(`${this.apiUrl}/${cliente.id}`, cliente))
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
