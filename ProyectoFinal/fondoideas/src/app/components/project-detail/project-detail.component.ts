import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  project: any; // Variable para almacenar el proyecto

  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private router: Router,
    private projectService: ProjectService // Servicio para obtener los proyectos
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el parámetro ID de la URL
    if (id) {
      this.loadProjectDetails(id);
    }
  }

  loadProjectDetails(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project) => (this.project = project),
      error: (err) => {
        console.error('Error al cargar el proyecto:', err);
        this.router.navigate(['/']);
      },
    });
  }
}
