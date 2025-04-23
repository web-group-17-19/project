import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private jsonUrl = '/assets/movies.json';
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getLocalMovies(): Observable<any> {
    console.log("Fetching movies from local JSON...");
    return this.http.get<any>(this.jsonUrl);
  }

  getApiMovies(): Observable<any> {
    console.log("Fetching movies from backend API...");
    return this.http.get<any>(`${this.apiUrl}/tasks/movies`);
  }

  getMovieById(id: string): Observable<any> {
    console.log("Fetching movie details from backend API...");
    return this.http.get<any>(`${this.apiUrl}/movies/${id}/`);
  }

  submitRating(rating: { movie: number, score: number }) {
    return this.http.post(`${this.apiUrl}/ratings/`, rating);
  }  

  getUserRating(movieId: number) {
    return this.http.get<{ score: number }>(`${this.apiUrl}/ratings/${movieId}/`);
  }
  
  submitReview(review: { text: string, movie: number }): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/reviews/`, review);
  }
  
  getReviews(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/${movieId}/`);
  }
  
  
  
}
