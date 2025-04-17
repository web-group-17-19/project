import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone:true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [
    '../../../assets/work.jpg',
    '../../../assets/galaxy.jpg',
    '../../../assets/flightr.jpg',
    '../../../assets/john.jpg',
    '../../../assets/transf.jpg'
  ];
  currentIndex = 0;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearTokens();
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: () => {
        this.authService.clearTokens();
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    });
    
  }   
  
}
