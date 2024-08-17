import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from 'src/app/services/tmdb.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For search form handling

@Component({
  selector: 'app-tvshow-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Add FormsModule for search input
  templateUrl: './tvshow-list.component.html',
  styleUrls: ['./tvshow-list.component.css']
})
export class TvShowListComponent {
  tvshows: any[] = [];
  searchQuery: string = '';

  constructor(
    private tmdbService: TmdbService,
    private authService: AuthService
  ) {}

  searchTvShows(): void {
    if (this.searchQuery.trim()) {
      this.tmdbService.searchTvShows(this.searchQuery).subscribe((data) => {
        this.tvshows = data.results;
      });
    }
  }

  addToFavorites(tvShowId: string): void {
    if (this.authService.isAuthenticated()) {
      this.authService.addToFavorites(tvShowId).subscribe(
        () => {
          alert('TV Show added to favorites');
        },
        (error: any) => {
          alert('Error adding to favorites');
        }
      );
    } else {
      alert('Please log in to add to favorites');
    }
  }
}


