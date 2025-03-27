import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private jsonUrl = 'assets/movies.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    console.log("Fetching movies...");
    return this.http.get<any>(this.jsonUrl);
  }
}
