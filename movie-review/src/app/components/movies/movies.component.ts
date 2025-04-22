import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf],
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchQuery: string = ''; 

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getApiMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;
    });
  }

  searchMovies() {
    this.filteredMovies = this.movies.filter(movie =>
      (movie.Title || movie.title).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getGenreList(movie: any): string {
    return movie.genres?.map((g: any) => g.name).join(', ') || 'No genres listed';
  }  

  goToMovieDetails(movie: any) {
    const id = movie.imdbID || movie.id;
    this.router.navigate(['/dashboard/movies', id]);
  }
}
