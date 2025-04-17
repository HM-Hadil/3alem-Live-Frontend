import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.css'
})
export class TestimonialsSectionComponent {
  testimonials = [
    {
      name: 'Allison Queen',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis est vitae lectus semper commodo. Morbi non erat malesuada, tempor lectus eu.'
    },
    {
      name: 'Max Jones',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis est vitae lectus semper commodo. Morbi non erat malesuada, tempor lectus eu.'
    },
    {
      name: 'Robinson Smith',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis est vitae lectus semper commodo. Morbi non erat malesuada, tempor lectus eu.'
    }
  ];
}
