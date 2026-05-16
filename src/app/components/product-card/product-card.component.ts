import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  product = input.required<Product>();
  quickAddClicked = output<Product>();

  productService = inject(ProductService);
  cartService = inject(CartService);
  readonly Math = Math;

  isWishlisted(): boolean {
    return this.productService.isInWishlist(this.product().id);
  }

  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.productService.toggleWishlist(this.product().id);
  }

  onQuickAdd(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const p = this.product();
    this.cartService.addItem(p, p.sizes[0], p.colors[0].name);
  }

  get discountPercent(): number {
    const p = this.product();
    if (!p.originalPrice) return 0;
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  }

  get stars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}