import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
  featuredProjects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  loadFeaturedProjects(): void {
    this.projectService.getFeaturedProjects().subscribe({
      next: (projects: any[]) => (this.featuredProjects = projects),
      error: (err: any) => console.error('Error al cargar proyectos:', err),
    });
  }
}
