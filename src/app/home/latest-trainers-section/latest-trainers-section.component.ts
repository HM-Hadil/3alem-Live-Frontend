import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-trainers-section',
  standalone: true,
  imports: [],
  templateUrl: './latest-trainers-section.component.html',
  styleUrl: './latest-trainers-section.component.css'
})
export class LatestTrainersSectionComponent {
  trainers = [
    {
      title: 'Product Management',
      count: 25
    },
    {
      title: 'Design',
      count: 32
    },
    {
      title: 'Mobile Dev',
      count: 64
    },
    {
      title: 'Senior Designer',
      count: 45
    },
    {
      title: 'Creative Director',
      count: 18
    },
    {
      title: 'Development',
      count: 102
    },
    {
      title: 'Marketing',
      count: 56
    },
    {
      title: 'Customer Service',
      count: 43
    }
  ];

}
