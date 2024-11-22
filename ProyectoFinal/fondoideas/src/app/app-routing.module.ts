import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el Home
  { 
    path: 'proyectos', 
    component: ProyectosComponent,
    // canActivate: [AuthGuard], 
  }, // Proyectos
  { 
    path: 'proyectos/:id',
    component: ProjectDetailComponent,
    canActivate: [AuthGuard], // Protegemos esta ruta
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '' }, // Ruta para manejar cualquier URL desconocida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
