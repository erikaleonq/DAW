import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/projects'; // URL del backend

  constructor(private http: HttpClient) {}

  getFeaturedProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/featured`); // Endpoint para proyectos destacados
  }
}
