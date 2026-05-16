import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cart = inject(CartService);

  promoCode = '';
  promoApplied = false;
  promoError = '';

  updateQuantity(item: CartItem, delta: number): void {
    this.cart.updateQuantity(
      item.product.id,
      item.selectedSize,
      item.selectedColor,
      item.quantity + delta
    );
  }

  removeItem(item: CartItem): void {
    this.cart.removeItem(item.product.id, item.selectedSize, item.selectedColor);
  }

  applyPromo(): void {
    if (this.promoCode.toUpperCase() === 'GlamFit20') {
      this.promoApplied = true;
      this.promoError = '';
    } else {
      this.promoError = 'Invalid promo code. Try GlamFit20.';
      this.promoApplied = false;
    }
  }

  get promoDiscount(): number {
    return this.promoApplied ? Math.round(this.cart.subtotal() * 0.2) : 0;
  }

  get finalTotal(): number {
    return this.cart.total() - this.promoDiscount;
  }
}