import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="listing">
      <img
          class="listing-photo"
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">
        <input type="text" [(ngModel)]="housingLocation.name" />
      </h2>
      <p class="listing-location">
        <input type="text" [(ngModel)]="housingLocation.city" />,
        <input type="text" [(ngModel)]="housingLocation.state" />
      </p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>

  x`,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
