import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logObj = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.logObj).subscribe({
      next: (tokens: any) => {
        this.authService.storeTokens(tokens);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error(err);
        alert("Invalid credentials!");
      }
    });
  }
}
