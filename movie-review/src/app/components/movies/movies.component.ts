import { Component, OnInit } from '@angular/core';
import { MovieService} from '../../service/movie.service';
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

  constructor(private movieService: MovieService) {}

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
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
