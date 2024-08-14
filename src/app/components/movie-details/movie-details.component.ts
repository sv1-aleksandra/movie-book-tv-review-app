import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']  // Ensure this is styleUrls with an 's'
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private movieService: MovieService,  // Ensure this matches the service import
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
      });
    }
  }
}
