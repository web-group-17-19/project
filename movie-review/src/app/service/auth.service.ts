import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenKey = 'access_token';
  public isLoggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http : HttpClient) { }

  login(data : {username:string, password :string}){
    return this.http.post(`${this.apiUrl}/token/`, data);
  }

  logout(){
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post(`${this.apiUrl}/logout/`, { refresh });
  }

  storeTokens(tokens: any){
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    this.isLoggedIn.next(true);
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  clearTokens(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedIn.next(false);
  }
}
