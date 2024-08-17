import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { TmdbService } from 'src/app/services/tmdb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tvshow-details',
  standalone: true,  // Standalone component
  imports: [CommonModule],  // Import CommonModule for date pipe and other common functionalities
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css']
})
export class TvShowDetailsComponent {
  tvshow: any;
  genresList: string = '';  // Define genresList property

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tmdbService.getTvShowById(+id).subscribe((data) => {
        this.tvshow = data;
        this.genresList = this.tvshow.genres.map((genre: any) => genre.name).join(', '); // Generate the genresList string
      });
    }
  }
}
