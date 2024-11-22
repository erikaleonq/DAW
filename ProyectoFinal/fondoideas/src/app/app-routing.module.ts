import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'proyectos', component: ProyectosComponent}, // canActivate: [AuthGuard] },
  { path: 'proyectos/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthenticatedGuard] },
  { path: 'crear-proyecto', component: CrearProyectoComponent },
  { path: '**', redirectTo: 'proyectos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
