import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onSubmit(): void {
    this.errorMessage = '';

    const credentials: LoginRequest = {
      email: this.email,
      password: this.password
    }

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        this.errorMessage = 'E-mail ou senha inválidos';
        console.error('Erro ao fazer login: ', error);
      }
    });

  }
}