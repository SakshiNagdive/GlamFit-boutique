import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models';

const MOCK_USER: User = {
  id: 1,
  firstName: 'Sophia',
  lastName: 'Laurent',
  email: 'sophia.laurent@email.com',
  phone: '+1 (555) 012-3456',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  private _loading = signal(false);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(email: string, _password: string): Promise<boolean> {
    this._loading.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this._user.set({ ...MOCK_USER, email });
        this._loading.set(false);
        resolve(true);
      }, 800);
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    _password: string
  ): Promise<boolean> {
    this._loading.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this._user.set({ id: Date.now(), firstName, lastName, email });
        this._loading.set(false);
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    this._user.set(null);
  }
}