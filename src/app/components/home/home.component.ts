import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Inject the Router service
  constructor(public router: Router) {}

  // Define the navigateToMovies method
  navigateToMovies() {
    this.router.navigate(['/movies']);
  }
}

