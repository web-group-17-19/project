import { Component } from '@angular/core';
import {Router, RouterOutlet, RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    RouterOutlet, RouterModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}
