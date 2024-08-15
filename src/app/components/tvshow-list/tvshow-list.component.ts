import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TmdbService } from 'src/app/services/tmdb.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';  // Ensure this is the correct path

@Component({
  selector: 'app-tvshow-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tvshow-list.component.html',
  styleUrls: ['./tvshow-list.component.css']
})
export class TvShowListComponent {
  tvshows: any[] = [];
  query: string = '';

  constructor(private tmdbService: TmdbService, private authService: AuthService) {}

  searchTvShows(): void {
    if (this.query.trim()) {
      this.tmdbService.searchTvShows(this.query).subscribe((data) => {
        this.tvshows = data.results;
      });
    }
  }

  addToFavorites(tvShowId: string): void {
    this.authService.addToFavorites(tvShowId).subscribe(() => {
      alert('TV Show added to favorites');
    }, (error: any) => {
      alert('Error adding to favorites');
    });
  }
}


