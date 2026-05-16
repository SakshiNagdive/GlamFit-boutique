import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { ProductFilter } from '../../models';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  productService = inject(ProductService);

  filter = signal<Partial<ProductFilter>>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 2000],
    sortBy: 'newest',
  });

  maxPrice = signal(2000);
  isFilterOpen = signal(false);

  products = computed(() => this.productService.getFilteredProducts(this.filter()));

  categories = ['Dresses', 'Knitwear', 'Outerwear', 'Silk Sets', 'Bottoms'];
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  colors = [
    { name: 'Cream', hex: '#FAF9F6' },
    { name: 'Ebony', hex: '#1B1B1C' },
    { name: 'Rose', hex: '#F9A8D4' },
    { name: 'Camel', hex: '#D2B48C' },
    { name: 'Slate', hex: '#708090' },
  ];
  sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];
  sortLabel = 'Newest First';

  toggleCategory(cat: string): void {
    this.filter.update((f) => {
      const cats = f.categories ?? [];
      return {
        ...f,
        categories: cats.includes(cat) ? cats.filter((c) => c !== cat) : [...cats, cat],
      };
    });
  }

  isCategorySelected(cat: string): boolean {
    return this.filter().categories?.includes(cat) ?? false;
  }

  toggleSize(size: string): void {
    this.filter.update((f) => {
      const sizes = f.sizes ?? [];
      return {
        ...f,
        sizes: sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size],
      };
    });
  }

  isSizeSelected(size: string): boolean {
    return this.filter().sizes?.includes(size) ?? false;
  }

  toggleColor(color: string): void {
    this.filter.update((f) => {
      const colors = f.colors ?? [];
      return {
        ...f,
        colors: colors.includes(color) ? colors.filter((c) => c !== color) : [...colors, color],
      };
    });
  }

  isColorSelected(color: string): boolean {
    return this.filter().colors?.includes(color) ?? false;
  }

  onPriceChange(value: number): void {
    this.maxPrice.set(value);
    this.filter.update((f) => ({ ...f, priceRange: [0, value] }));
  }

  onSortChange(value: string): void {
    const opt = this.sortOptions.find((o) => o.value === value);
    if (opt) this.sortLabel = opt.label;
    this.filter.update((f) => ({ ...f, sortBy: value as ProductFilter['sortBy'] }));
  }

  clearFilters(): void {
    this.maxPrice.set(2000);
    this.filter.set({ categories: [], sizes: [], colors: [], priceRange: [0, 2000], sortBy: 'newest' });
  }

  toggleFilterPanel(): void {
    this.isFilterOpen.update((v) => !v);
  }
}