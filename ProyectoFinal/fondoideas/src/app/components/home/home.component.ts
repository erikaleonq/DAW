import { Component, OnInit } from '@angular/core';
import { ProjectService } from  '../../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProjects: any[] = []; // Aquí guardamos los proyectos destacados

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  loadFeaturedProjects(): void {
    this.projectService.getFeaturedProjects().subscribe({
      next: (projects) => (this.featuredProjects = projects),
      error: (err) => console.error('Error al cargar proyectos:', err),
    });
  }
}

