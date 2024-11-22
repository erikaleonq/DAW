import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getFeaturedProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProject(projectData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http.post(this.baseUrl, projectData, { headers });
  }
  
}
