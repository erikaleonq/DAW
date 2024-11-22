import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss'],
})
export class CrearProyectoComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      nombre_proyecto: ['', Validators.required],
      descripcion: ['', Validators.required],
      categorias: [''],
      url_logo: [''],
      redes: [''],
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;
  
      const categoriasArray = formValues.categorias.split(',').map((item: string) => item.trim());
      const redesArray = formValues.redes.split(',').map((item: string) => item.trim());
  
      const proyectoData = {
        ...formValues,
        categorias: categoriasArray,
        redes: redesArray,
      };

      console.log(proyectoData)
  
      this.projectService.createProject(proyectoData).subscribe({
        next: () => {
          alert('Proyecto creado exitosamente');
          this.projectForm.reset();
        },
        error: (err) => console.error('Error al crear el proyecto:', err),
      });
    }
  }
  
}
