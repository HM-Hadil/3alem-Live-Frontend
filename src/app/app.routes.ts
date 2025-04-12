import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterExpertComponent } from './auth/register-expert/register-expert.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterExpertComponent },
];
