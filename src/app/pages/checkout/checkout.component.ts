import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

type CheckoutStep = 'shipping' | 'payment' | 'review';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  cart = inject(CartService);
  router = inject(Router);

  step = signal<CheckoutStep>('shipping');
  orderPlaced = signal(false);
  placing = signal(false);

  // ✅ FIX: stable order ID (generated once)
  orderId = Math.floor(100000 + Math.random() * 900000);

  shipping = {
    firstName: '', lastName: '',
    email: '', phone: '',
    address1: '', address2: '',
    city: '', state: '', zip: '', country: 'United States',
  };

  payment = {
    cardNumber: '', cardName: '',
    expiry: '', cvv: '',
    saveCard: false,
  };

  steps: { key: CheckoutStep; label: string }[] = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  get currentStepIndex(): number {
    return this.steps.findIndex((s) => s.key === this.step());
  }

  goTo(s: CheckoutStep): void {
    this.step.set(s);
  }

  next(): void {
    const idx = this.currentStepIndex;
    if (idx < this.steps.length - 1) {
      this.step.set(this.steps[idx + 1].key);
    }
  }

  back(): void {
    const idx = this.currentStepIndex;
    if (idx > 0) {
      this.step.set(this.steps[idx - 1].key);
    }
  }

  placeOrder(): void {
    this.placing.set(true);

    setTimeout(() => {
      this.placing.set(false);
      this.orderPlaced.set(true);
      this.cart.clearCart();
    }, 1800);
  }

  formatCard(value: string): string {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  }

  get maskedCard(): string {
    const last4 = this.payment.cardNumber.replace(/\s/g, '').slice(-4);
    return `•••• •••• •••• ${last4}`;
  }
}