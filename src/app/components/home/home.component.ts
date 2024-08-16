import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for any structural directives

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}

