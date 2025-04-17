import { Component } from '@angular/core';

@Component({
  selector: 'app-talent-categories',
  standalone: true,
  imports: [],
  templateUrl: './talent-categories.component.html',
  styleUrl: './talent-categories.component.css'
})
export class TalentCategoriesComponent {
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
}
