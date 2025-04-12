import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-expert',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-expert.component.html',
  styleUrl: './register-expert.component.css'
})
export class RegisterExpertComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
}
