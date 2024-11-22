import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/projects'; // Base URL del backend

  constructor(private http: HttpClient) {}

  // Método para obtener proyectos destacados
  getFeaturedProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  // Método para obtener un proyecto por ID
  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
