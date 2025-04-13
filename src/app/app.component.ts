import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3alemLiveFront';
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

  categories = [
    {
      title: 'Development & IT',
      talents: 4370,
      skills: 493
    },
    {
      title: 'Design & Creative',
      talents: 6750,
      skills: 709
    },
    {
      title: 'Sales & Marketing',
      talents: 3623,
      skills: 412
    },
    {
      title: 'Customer Support',
      talents: 5280,
      skills: 387
    },
    {
      title: 'Finance & Accounting',
      talents: 4380,
      skills: 523
    },
    {
      title: 'Engineering',
      talents: 6270,
      skills: 621
    },
    {
      title: 'Writing & Translation',
      talents: 6430,
      skills: 568
    },
    {
      title: 'Legal',
      talents: 4320,
      skills: 349
    },
    {
      title: 'Photography',
      talents: 5430,
      skills: 487
    }
  ];

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

  trustedCompanies = [
    'coinbase', 'spotify', 'slack', 'adobe', 'webflow', 'zoom'
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
