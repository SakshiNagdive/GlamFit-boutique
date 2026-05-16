import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  shopLinks = [
    { label: 'New Arrivals', path: '/products' },
    { label: 'Clothing', path: '/products' },
    { label: 'Accessories', path: '/products' },
    { label: 'Sale', path: '/products' },
  ];

  helpLinks = [
    { label: 'Shipping & Returns', path: '/contact' },
    { label: 'Size Guide', path: '/contact' },
    { label: 'FAQ', path: '/contact' },
    { label: 'Contact Us', path: '/contact' },
  ];

  aboutLinks = [
    { label: 'Our Story', path: '/about' },
    { label: 'Sustainability', path: '/about' },
    { label: 'Press', path: '/about' },
    { label: 'Careers', path: '/about' },
  ];
}