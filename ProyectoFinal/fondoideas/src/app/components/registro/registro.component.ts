import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  registroForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  // Acceso rápido a los campos del formulario
  get f() {
    return this.registroForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Si el formulario no es válido, detener la ejecución
    if (this.registroForm.invalid) {
      return;
    }

    // Enviar los datos al backend
    this.authService.register(this.registroForm.value).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
      },
    });
  }
}
