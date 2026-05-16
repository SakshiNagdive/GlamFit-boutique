import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductFilter } from '../models';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Silk Reverie Midi Dress',
    price: 420,
    originalPrice: 595,
    category: 'Dresses',
    description: 'A flowing silk midi dress with a delicate floral pattern. Cut from 100% pure mulberry silk, it drapes beautifully with a relaxed silhouette perfect for elevated everyday wear.',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FAF9F6' },
      { name: 'Rose', hex: '#F9A8D4' },
      { name: 'Slate', hex: '#708090' },
    ],
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviewCount: 124,
    inWishlist: false,
  },
  {
    id: 2,
    name: 'Cashmere Cocoon Coat',
    price: 890,
    category: 'Outerwear',
    description: 'Luxurious 100% Scottish cashmere in a generous cocoon silhouette. Features deep side pockets and an elegant shawl collar.',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#D2B48C' },
      { name: 'Cream', hex: '#FAF9F6' },
      { name: 'Ebony', hex: '#1B1B1C' },
    ],
    isNew: true,
    rating: 4.9,
    reviewCount: 67,
    inWishlist: true,
  },
  {
    id: 3,
    name: 'Merino Ribbed Turtleneck',
    price: 195,
    category: 'Knitwear',
    description: 'Ultra-fine merino wool in a classic ribbed turtleneck. Naturally temperature-regulating and irresistibly soft against the skin.',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FAF9F6' },
      { name: 'Rose', hex: '#F9A8D4' },
      { name: 'Slate', hex: '#708090' },
      { name: 'Ebony', hex: '#1B1B1C' },
    ],
    isNew: true,
    rating: 4.7,
    reviewCount: 203,
    inWishlist: false,
  },
  {
    id: 4,
    name: 'Fluid Wide-Leg Trousers',
    price: 285,
    category: 'Bottoms',
    description: 'Effortlessly tailored wide-leg trousers in a flowy satin-finish fabric. A wardrobe essential that transitions from office to evening.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FAF9F6' },
      { name: 'Camel', hex: '#D2B48C' },
    ],
    isNew: false,
    rating: 4.6,
    reviewCount: 89,
    inWishlist: false,
  },
  {
    id: 5,
    name: 'Linen Relaxed Blazer',
    price: 345,
    originalPrice: 495,
    category: 'Outerwear',
    description: 'A boxy, relaxed-fit blazer in premium stonewashed linen. Unlined for a lighter feel, with patch pockets and a subtle texture.',
    imageUrl: 'https://images.unsplash.com/photo-1548624313-0396a5f3a6c7?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#D2B48C' },
      { name: 'Cream', hex: '#FAF9F6' },
    ],
    isSale: true,
    rating: 4.5,
    reviewCount: 156,
    inWishlist: false,
  },
  {
    id: 6,
    name: 'Silk Charmeuse Blouse',
    price: 260,
    category: 'Silk Sets',
    description: 'Elegant charmeuse blouse with a fluid drape and subtle sheen. Features a wrap-front detail and long sleeves with button cuffs.',
    imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Rose', hex: '#F9A8D4' },
      { name: 'Cream', hex: '#FAF9F6' },
      { name: 'Slate', hex: '#708090' },
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 91,
    inWishlist: true,
  },
  {
    id: 7,
    name: 'Wool Crepe Midi Skirt',
    price: 225,
    category: 'Bottoms',
    description: 'A structured midi skirt in a double-faced wool crepe. Features a high waist, hidden side zip, and a subtle A-line flare.',
    imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ebony', hex: '#1B1B1C' },
      { name: 'Camel', hex: '#D2B48C' },
    ],
    isNew: false,
    rating: 4.7,
    reviewCount: 78,
    inWishlist: false,
  },
  {
    id: 8,
    name: 'Draped Jersey Maxi Dress',
    price: 310,
    category: 'Dresses',
    description: 'A goddess-like maxi dress in matte stretch jersey. Features strategic draping at the bodice and a comfortable relaxed fit through the skirt.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FAF9F6' },
      { name: 'Slate', hex: '#708090' },
      { name: 'Ebony', hex: '#1B1B1C' },
    ],
    isNew: false,
    rating: 4.9,
    reviewCount: 212,
    inWishlist: false,
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>(MOCK_PRODUCTS);
  private _wishlist = signal<number[]>([2, 6]);

  readonly products = this._products.asReadonly();
  readonly wishlistIds = this._wishlist.asReadonly();

  readonly wishlistCount = computed(() => this._wishlist().length);

  getProductById(id: number): Product | undefined {
    return this._products().find((p) => p.id === id);
  }

  getFilteredProducts(filter: Partial<ProductFilter>): Product[] {
    let result = [...this._products()];

    if (filter.categories?.length) {
      result = result.filter((p) => filter.categories!.includes(p.category));
    }

    if (filter.sizes?.length) {
      result = result.filter((p) =>
        p.sizes.some((s) => filter.sizes!.includes(s))
      );
    }

    if (filter.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= filter.priceRange![0] && p.price <= filter.priceRange![1]
      );
    }

    switch (filter.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }

  toggleWishlist(productId: number): void {
    this._wishlist.update((ids) =>
      ids.includes(productId)
        ? ids.filter((id) => id !== productId)
        : [...ids, productId]
    );
  }

  isInWishlist(productId: number): boolean {
    return this._wishlist().includes(productId);
  }

  getRelatedProducts(productId: number, limit = 4): Product[] {
    const product = this.getProductById(productId);
    if (!product) return [];
    return this._products()
      .filter((p) => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  }
}