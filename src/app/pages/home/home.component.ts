import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  productService = inject(ProductService);

  featuredProducts = this.productService
    .products()
    .filter((p) => p.isNew || p.isSale)
    .slice(0, 4);

  newArrivals = this.productService
    .products()
    .filter((p) => p.isNew)
    .slice(0, 4);

  categories = [
    {
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop',
      count: 42,
    },
    {
      name: 'Knitwear',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop',
      count: 28,
    },
    {
      name: 'Outerwear',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop',
      count: 19,
    },
    {
      name: 'Silk Sets',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop',
      count: 15,
    },
  ];

  features = [
    { icon: 'local_shipping', title: 'Free Shipping', desc: 'On all orders over $250' },
    { icon: 'autorenew', title: 'Easy Returns', desc: '30-day return policy' },
    { icon: 'verified', title: 'Authenticity', desc: '100% genuine luxury pieces' },
    { icon: 'support_agent', title: 'Concierge', desc: 'Personal styling advice' },
  ];
}