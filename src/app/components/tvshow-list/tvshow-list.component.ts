// src/app/components/tvshow-list/tvshow-list.component.ts

import { Component, OnInit } from '@angular/core';
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
export class TvShowListComponent implements OnInit {
  tvshows: any[] = [];
  searchQuery: string = '';
  recommendations: any[] = []; // Array to hold random TV show recommendations

  constructor(
    private tmdbService: TmdbService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch random TV show recommendations on component initialization
    this.tmdbService.getPopularTvShows().subscribe((data) => {
      this.recommendations = data.results.slice(0, 8); // Limit to 8 TV shows for two rows
    });
  }

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

