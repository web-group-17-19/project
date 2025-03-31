import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logObj: any = {
    EmailId: "",
    Password: ""
  };

  constructor(private router: Router) {}

  onLogin() {
    const users = [
      { EmailId: "user@example.com", Password: "password123" }
    ];

    const user = users.find(u => u.EmailId === this.logObj.EmailId && u.Password === this.logObj.Password);

    if (user) {
      const fakeToken = `fake-jwt-token-${new Date().getTime()}`;
      localStorage.setItem('jwt_token', fakeToken);
      this.router.navigateByUrl('/home');
    } else {
      alert("Invalid credentials!");
    }
  }
}
