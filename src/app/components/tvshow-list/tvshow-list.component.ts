import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from 'src/app/services/tmdb.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-tvshow-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './tvshow-list.component.html',
  styleUrls: ['./tvshow-list.component.css']
})
export class TvShowListComponent {
  tvshows: any[] = [];

  constructor(private tmdbService: TmdbService, private authService: AuthService) {}

  searchTvShows(query: string): void {
    if (query.trim()) {
      this.tmdbService.searchTvShows(query).subscribe((data) => {
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


