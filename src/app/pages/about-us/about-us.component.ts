import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  values = [
    { icon: 'favorite', title: 'Crafted with Love', desc: 'Every piece is selected with an obsessive attention to quality, fabric, and fit — nothing makes it to our collection by accident.' },
    { icon: 'eco', title: 'Sustainably Minded', desc: 'We partner only with brands that share our commitment to ethical production, responsible sourcing, and environmental consciousness.' },
    { icon: 'verified', title: 'Authenticity Guaranteed', desc: 'We stand behind every item we sell. 100% genuine luxury, curated directly from designers and certified suppliers.' },
    { icon: 'diversity_3', title: 'Inclusive Elegance', desc: 'Beauty takes many forms. Our collection celebrates diverse bodies, styles, and stories — because luxury should be for everyone.' },
  ];

  team = [
    { name: 'Isabelle Marchand', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80' },
    { name: 'Nadia Fontaine', role: 'Head of Curation', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80' },
    { name: 'Clara Besson', role: 'Sustainability Lead', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  ];

  stats = [
    { value: '12+', label: 'Years of Curation' },
    { value: '150+', label: 'Global Designers' },
    { value: '50K+', label: 'Happy Clients' },
    { value: '40+', label: 'Countries Served' },
  ];
}