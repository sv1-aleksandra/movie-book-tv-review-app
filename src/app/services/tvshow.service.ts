import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TvShow } from '../models/tvshow.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  private apiUrl = 'http://localhost:4000/api/tvshows';
  private tmdbApiKey = 'edf618b7f5cd0726149b85793d30a1f9'; 
  private tmdbApiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(this.apiUrl).pipe(
      switchMap((tvShows: TvShow[]) => {
        // For each TV show, fetch the image from TMDb
        const tvShowRequests = tvShows.map(tvShow =>
          this.fetchTvShowImage(tvShow.name).pipe(
            map(imageUrl => ({ ...tvShow, imageUrl })) // Merge the image URL into the TvShow object
          )
        );
        return forkJoin(tvShowRequests); // Wait for all requests to complete
      })
    );
  }

  getTvShow(id: string): Observable<TvShow> {
    return this.http.get<TvShow>(`${this.apiUrl}/${id}`).pipe(
      switchMap((tvShow: TvShow) =>
        this.fetchTvShowImage(tvShow.name).pipe(
          map(imageUrl => ({ ...tvShow, imageUrl })) // Merge the image URL into the TvShow object
        )
      )
    );
  }

  private fetchTvShowImage(tvShowName: string): Observable<string> {
    // Fetch TV show data from TMDb
    return this.http
      .get<any>(
        `${this.tmdbApiUrl}/search/tv?api_key=${this.tmdbApiKey}&query=${encodeURIComponent(
          tvShowName
        )}`
      )
      .pipe(
        map(response => {
          const show = response.results[0];
          if (show && show.poster_path) {
            return `https://image.tmdb.org/t/p/w500${show.poster_path}`;
          }
          return ''; // Return an empty string if no image is found
        })
      );
  }
}
