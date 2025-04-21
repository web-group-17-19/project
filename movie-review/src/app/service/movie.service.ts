import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private jsonUrl = '/assets/movies.json';
  private apiUrl = 'http://127.0.0.1:8000/api/movies-list/';

  constructor(private http: HttpClient) {}

  getLocalMovies(): Observable<any> {
    console.log("Fetching movies from local JSON...");
    return this.http.get<any>(this.jsonUrl);
  }

  getApiMovies(): Observable<any> {
    console.log("Fetching movies from backend API...");
    return this.http.get<any>(this.apiUrl);
  }
}
