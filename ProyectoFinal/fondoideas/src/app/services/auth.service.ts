import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/login';
  private baseUrl2 = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); 
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  register(userData: any): Observable<any> {
    console.log(userData)
    return this.http.post(`${this.baseUrl2}/users`, userData);
  }

  getUserRole(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Usuario no autenticado');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl2}/users`, { headers });
  }
  
}
