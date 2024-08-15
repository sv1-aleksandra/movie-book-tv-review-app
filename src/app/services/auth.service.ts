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
    
    // Now that isBrowser is initialized, we can safely set the baseUrl
    this.baseUrl = this.isBrowser ? '' : 'http://localhost:4000'; // Adjust the base URL for SSR

    const initialToken = this.isBrowser ? localStorage.getItem('token') : null;
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
  }

  // Register user
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/register`, { username, email, password });
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/api/users/login`, { email, password })
      .pipe(tap(response => {
        this.setToken(response.token);
      }));
  }

  // Get user profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/profile`, {
      headers: { Authorization: `Bearer ${this.tokenSubject.value}` }
    });
  }

  // Logout user
  logout(): void {
    this.setToken(null);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  // Add TV show to favorites
  addToFavorites(tvShowId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/favorites`, { tvShowId }, {
      headers: { Authorization: `Bearer ${this.tokenSubject.value}` }
    });
  }

  // Get user's favorite TV shows
  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/favorites`, {
      headers: { Authorization: `Bearer ${this.tokenSubject.value}` }
    });
  }

  // Private method to set token in both BehaviorSubject and localStorage
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



