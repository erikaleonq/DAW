import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/login'; // Endpoint del backend para login
  private baseUrl2 = 'http://localhost:3000/'; // Endpoint del backend para login

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Guardar el token en localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Obtener el token desde localStorage
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Verificar si el token existe
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Eliminar el token del almacenamiento
  }

  register(userData: any): Observable<any> {
    console.log(userData)
    return this.http.post(`${this.baseUrl2}/users`, userData);
  }
}
