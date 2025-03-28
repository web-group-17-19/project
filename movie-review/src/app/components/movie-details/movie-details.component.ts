import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {

}import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    const imdbID = this.route.snapshot.paramMap.get('id');

    this.movieService.getMovies().subscribe(data => {
      this.movie = data.find((m: { imdbID: string }) => m.imdbID === imdbID);
    });
  }
  getStars(rating: string): string {
    let value = parseFloat(rating);

    if (rating.includes('%')) {
      value = (value / 100) * 5;
    } else if (value > 10) {
      value = (value / 100) * 5;
    } else {
      value = (value / 2);
    }

    const stars = '⭐'.repeat(Math.round(value));
    return stars.padEnd(5, '☆');
  }

  goBack() {
    window.history.back();
  }
}

