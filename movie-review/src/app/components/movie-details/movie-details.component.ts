import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../service/review';


@Component({
  selector: 'app-movie-details',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  reviews: Review[] = [];
  newReview = { text: '' };
  selectedRating = 0;
  ratingSubmitted = false;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.movieService.getApiMovies().subscribe(data => {
        this.movie = data.find((m: any) => String(m.id) === id);
        this.checkUserRating(this.movie.id);
        this.loadReviews(this.movie.id);
      });
  }

  checkUserRating(movieId: number) {
    this.movieService.getUserRating(movieId).subscribe({
      next: (res) => {
        if (res.score !== null) {
          this.selectedRating = res.score;
          this.ratingSubmitted = true;
        }
      },
      error: (err) => {
        console.error('Could not load user rating', err);
      }
    });
  }
  
  getGenreList(movie: any): string {
    return movie.genres?.map((g: any) => g.name).join(', ') || 'No genres listed';
  }

  goBack() {
    window.history.back();
  }

  rateMovie(score: number) {
    if (this.ratingSubmitted) return;
  
    this.selectedRating = score;
  
    const ratingPayload = {
      movie: this.movie.id,
      score: score
    };
  
    this.movieService.submitRating(ratingPayload).subscribe({
      next: () => {
        this.ratingSubmitted = true;
    
        this.movieService.getMovieById(this.movie.id).subscribe(updatedMovie => {
          this.movie = updatedMovie;
        });
      },
      error: (err) => {
        console.error('Failed to submit rating', err);
      }
    });
  } 

  loadReviews(movieId: number) {
    this.movieService.getReviews(movieId).subscribe(data => {
      this.reviews = data;
    });
  }
  
  addReview() {
    if (this.newReview.text.trim()) {
      const reviewPayload = {
        text: this.newReview.text,
        movie: this.movie.id
      };
  
      this.movieService.submitReview(reviewPayload).subscribe({
        next: (res: Review) => {
          console.log('Review submission response:', res);
          this.loadReviews(this.movie.id);
          this.newReview = { text: '' };
        },
        error: (err) => {
          console.error('Failed to submit review', err);
        }
      });
    }
  }
}
