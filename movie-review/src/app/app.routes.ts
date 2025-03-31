import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth.guard"; // Import the guard
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'home',component: HomeComponent},
  {path: 'dashboard',component: DashboardComponent,
    children: [
      { path: 'movies', component: MoviesComponent },  // Movies list page
      { path: 'movies/:id', component: MovieDetailsComponent }  // Movie details page
    ]
  }
];
