import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    // Verificar si el usuario está autenticado
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    // Método para cerrar sesión
    this.authService.logout();
  }
}
