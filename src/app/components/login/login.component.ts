import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Use AuthService to log in the user
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Navigate to the home page or dashboard after successful login
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }
}








