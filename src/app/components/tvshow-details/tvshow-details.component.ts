import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tvshow-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {
  tvshow: any;
  genres: string = '';  // Add a property to hold the formatted genres

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tmdbService.getTvShowById(id).subscribe((data) => {
      this.tvshow = data;
      this.genres = this.formatGenres(this.tvshow.genres);
    });
  }

  // Method to format the genres
  formatGenres(genres: { id: number; name: string }[]): string {
    return genres.map(g => g.name).join(', ');
  }
}



