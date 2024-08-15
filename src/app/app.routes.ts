import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TvShowListComponent } from './components/tvshow-list/tvshow-list.component';
import { TvShowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { FavoritesComponent } from 'src/app/favorites/favorites.component';



// Define the routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tvshows', component: TvShowListComponent },
  { path: 'tvshows/:id', component: TvShowDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback route for unknown paths
];
