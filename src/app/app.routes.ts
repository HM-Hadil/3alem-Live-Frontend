import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterExpertComponent } from './auth/register-expert/register-expert.component';
import { DashboardComponent } from './espaceExpert/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path:'dashboard',component:DashboardComponent},
  { path: 'register', component: RegisterExpertComponent },
];
