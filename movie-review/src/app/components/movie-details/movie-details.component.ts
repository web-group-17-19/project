import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-movie-details',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  reviews: { text: string }[] = [];
  newReview = { text: '' };


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
  addReview() {
    if (this.newReview.text.trim()) {
      this.reviews.push({ ...this.newReview });
      this.newReview = { text: '' };
    }
  }

  goBack() {
    window.history.back();
  }
}
