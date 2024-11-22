import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  project: any;
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe({
        next: (data) => (this.project = data),
        error: (err) => console.error('Error al cargar el proyecto:', err),
      });

      this.authService.getUserRole().subscribe({
        next: (userData) => {
          this.userRole = userData.role;
        },
        error: (err) => console.error('Error al obtener el rol del usuario:', err),
      });
    }
  }

  onSupportProject(): void {
    alert(
      'Gracias por apoyar este proyecto. ¡Pronto nos pondremos en contacto contigo!'
    );
  }
}
