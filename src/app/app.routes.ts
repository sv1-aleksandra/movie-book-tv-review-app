import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { TvshowListComponent } from './components/tvshow-list/tvshow-list.component';

// Define the routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'tvshows', component: TvshowListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback route for unknown paths
];
