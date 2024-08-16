import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = 'edf618b7f5cd0726149b85793d30a1f9'; // TMDb API key
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Search for TV Shows by Name
  searchTvShows(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/search/tv?api_key=${this.apiKey}&query=${query}`
    );
  }

  // Get TV Show Details by ID
  getTvShowById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }
}

