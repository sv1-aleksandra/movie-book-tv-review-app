import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TvShow } from '../models/tvshow.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  private apiUrl = 'http://localhost:4000/api/tvshows';

  constructor(private http: HttpClient) {}

  getTvShows(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(this.apiUrl);
  }

  getTvShow(id: string): Observable<TvShow> {
    return this.http.get<TvShow>(`${this.apiUrl}/${id}`);
  }
}
