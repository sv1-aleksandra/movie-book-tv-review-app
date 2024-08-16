import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  private isBrowser: boolean;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.baseUrl = this.isBrowser ? '' : 'http://localhost:4000';

    const initialToken = this.isBrowser ? localStorage.getItem('token') : null;
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/register`, { username, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/api/users/login`, { email, password })
      .pipe(tap(response => {
        this.setToken(response.token);
      }));
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/profile`, {
      headers: { Authorization: `Bearer ${this.tokenSubject.value}` }
    });
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  addToFavorites(tvShowId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/favorites`, { tvShowId }, {
      headers: { Authorization: `Bearer ${this.tokenSubject.value}` }
    });
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/favorites`, {
      headers: { Authorization: `Bearer ${this.tokenSubject.value}` }
    });
  }

  private setToken(token: string | null): void {
    this.tokenSubject.next(token);
    if (this.isBrowser) {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }
}




