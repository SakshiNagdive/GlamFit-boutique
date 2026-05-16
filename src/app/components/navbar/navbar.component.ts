import {
  Component,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  cart = inject(CartService);
  auth = inject(AuthService);
  productService = inject(ProductService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  searchQuery = signal('');

  navLinks = [
    { label: 'New', path: '/products', query: { category: 'new' } },
    { label: 'Clothing', path: '/products', query: { category: 'clothing' } },
    { label: 'Accessories', path: '/products', query: { category: 'accessories' } },
    { label: 'Sale', path: '/products', query: { category: 'sale' } },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}