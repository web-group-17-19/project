import { Component } from '@angular/core';
import {Router, RouterOutlet, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Добавляем импорт CommonModule


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone:true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    '../../../assets/work.jpg',
    '../../../assets/galaxy.jpg',
    '../../../assets/flightr.jpg',
    '../../../assets/john.jpg',
    '../../../assets/transf.jpg'
  ];
  currentIndex = 0;
  constructor(private router: Router) {}

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
  
}
