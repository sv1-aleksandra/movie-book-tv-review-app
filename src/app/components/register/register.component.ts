import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-register',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Use AuthService to register the user
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        // Navigate to the login page or another page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      },
      complete: () => {
        console.log('Registration request completed');
      }
    });
  }
}







