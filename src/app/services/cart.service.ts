import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  readonly shipping = computed(() => (this.subtotal() >= 250 ? 0 : 15));

  readonly total = computed(() => this.subtotal() + this.shipping());

  readonly discount = computed(() =>
    this._items().reduce((sum, item) => {
      const orig = item.product.originalPrice ?? item.product.price;
      return sum + (orig - item.product.price) * item.quantity;
    }, 0)
  );

  addItem(
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity = 1
  ): void {
    this._items.update((items) => {
      const idx = items.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedSize === selectedSize &&
          i.selectedColor === selectedColor
      );
      if (idx >= 0) {
        const updated = [...items];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity,
        };
        return updated;
      }
      return [...items, { product, quantity, selectedSize, selectedColor }];
    });
  }

  removeItem(productId: number, size: string, color: string): void {
    this._items.update((items) =>
      items.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedSize === size &&
            i.selectedColor === color
          )
      )
    );
  }

  updateQuantity(
    productId: number,
    size: string,
    color: string,
    quantity: number
  ): void {
    if (quantity <= 0) {
      this.removeItem(productId, size, color);
      return;
    }
    this._items.update((items) =>
      items.map((i) =>
        i.product.id === productId &&
        i.selectedSize === size &&
        i.selectedColor === color
          ? { ...i, quantity }
          : i
      )
    );
  }

  clearCart(): void {
    this._items.set([]);
  }
}