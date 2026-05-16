import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models';

@Component({
  selector: 'app-product-detail', 
  standalone: true,
  imports: [RouterLink, CurrencyPipe, TitleCasePipe, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);

  readonly Math = Math;

  product = signal<Product | undefined>(undefined);
  selectedImage = signal(0);
  selectedSize = signal('');
  selectedColor = signal('');
  quantity = signal(1);
  addedToCart = signal(false);
  activeTab = signal<'description' | 'care' | 'shipping'>('description');

  relatedProducts = computed(() => {
    const p = this.product();
    return p ? this.productService.getRelatedProducts(p.id, 4) : [];
  });

  isWishlisted = computed(() => {
    const p = this.product();
    return p ? this.productService.isInWishlist(p.id) : false;
  });

  get stars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const p = this.productService.getProductById(id);
    this.product.set(p);

    if (p) {
      this.selectedSize.set(p.sizes[0]);
      this.selectedColor.set(p.colors[0].name);
    }
  }

  selectImage(idx: number): void {
    this.selectedImage.set(idx);
  }

  selectSize(size: string): void {
    this.selectedSize.set(size);
  }

  selectColor(color: string): void {
    this.selectedColor.set(color);
  }

  adjustQty(delta: number): void {
    this.quantity.update((q) => Math.max(1, q + delta));
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;

    this.cartService.addItem(
      p,
      this.selectedSize(),
      this.selectedColor(),
      this.quantity()
    );

    this.addedToCart.set(true);
    setTimeout(() => this.addedToCart.set(false), 2000);
  }

  toggleWishlist(): void {
    const p = this.product();
    if (p) {
      this.productService.toggleWishlist(p.id);
    }
  }
}