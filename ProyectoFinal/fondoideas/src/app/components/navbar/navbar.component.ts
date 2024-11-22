import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false; // Actualizar el estado
    this.router.navigate(['/login']);
  }
}

