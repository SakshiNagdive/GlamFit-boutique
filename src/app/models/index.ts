// ── Product ──────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  imageUrl: string;
  images?: string[];
  sizes: string[];
  colors: ProductColor[];
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  inWishlist?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

// ── Cart ─────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

// ── User ─────────────────────────────────────────────────────
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// ── Order ────────────────────────────────────────────────────
export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
}

// ── Filter ───────────────────────────────────────────────────
export interface ProductFilter {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}