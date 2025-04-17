import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { HeroSectionComponent } from './home/hero-section/hero-section.component';
import { TrustedCompaniesComponent } from './home/trusted-companies/trusted-companies.component';
import { LatestTrainersSectionComponent } from './home/latest-trainers-section/latest-trainers-section.component';
import { TalentCategoriesComponent } from './home/talent-categories/talent-categories.component';
import { PopularSectionComponent } from './home/popular-section/popular-section.component';
import { CtaSectionComponent } from './home/cta-section/cta-section.component';
import { TestimonialsSectionComponent } from './home/testimonials-section/testimonials-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,HeroSectionComponent,TrustedCompaniesComponent,
    LatestTrainersSectionComponent,TalentCategoriesComponent,PopularSectionComponent,CtaSectionComponent,
    TestimonialsSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3alemLiveFront';
  
  
  constructor() { }

  ngOnInit(): void {
  }
}
