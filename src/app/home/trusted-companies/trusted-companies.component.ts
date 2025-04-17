import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted-companies',
  standalone: true,
  imports: [],
  templateUrl: './trusted-companies.component.html',
  styleUrl: './trusted-companies.component.css'
})
export class TrustedCompaniesComponent {


  

  trustedCompanies = [
    'coinbase', 'spotify', 'slack', 'adobe', 'webflow', 'zoom'
  ];

}
