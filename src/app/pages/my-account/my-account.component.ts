import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

type AccountTab = 'orders' | 'wishlist' | 'profile' | 'addresses';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, TitleCasePipe, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
  auth = inject(AuthService);
  router = inject(Router);

  activeTab = signal<AccountTab>('orders');

  orders = [
    {
      id: 'LB-100482',
      date: new Date('2025-03-12'),
      status: 'delivered' as const,
      total: 705,
      items: [
        { name: 'Silk Reverie Midi Dress', size: 'S', color: 'Rose', price: 420, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&auto=format&fit=crop' },
        { name: 'Merino Ribbed Turtleneck', size: 'S', color: 'Cream', price: 195, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&auto=format&fit=crop' },
      ],
    },
    {
      id: 'LB-100391',
      date: new Date('2025-02-05'),
      status: 'shipped' as const,
      total: 890,
      items: [
        { name: 'Cashmere Cocoon Coat', size: 'S', color: 'Camel', price: 890, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&auto=format&fit=crop' },
      ],
    },
  ];

  wishlistItems = [
    { id: 2, name: 'Cashmere Cocoon Coat', price: 890, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&auto=format&fit=crop' },
    { id: 6, name: 'Silk Charmeuse Blouse', price: 260, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&auto=format&fit=crop' },
  ];

  profile = {
    firstName: 'Sophia',
    lastName: 'Laurent',
    email: 'sophia.laurent@email.com',
    phone: '+1 (555) 012-3456',
  };

  statusColors: Record<string, string> = {
    delivered: '#2d8a4e',
    shipped: '#1565c0',
    processing: '#e65100',
    cancelled: '#ba1a1a',
  };

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  saveProfile(): void {
    // In a real app: call API
    alert('Profile saved!');
  }
}