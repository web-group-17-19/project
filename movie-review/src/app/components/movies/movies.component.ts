import { Component, OnInit } from '@angular/core';
import { MovieService} from '../../service/movie.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchQuery: string = "";

  constructor(private movieService: MovieService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;
    });
  }

  searchMovies() {
    this.filteredMovies = this.movies.filter(movie =>
      movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/home/dashboard/movies', movie.imdbID]);
  }
}
