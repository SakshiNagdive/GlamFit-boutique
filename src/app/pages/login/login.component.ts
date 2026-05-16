import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  activeTab = signal<'login' | 'register'>('login');

  login = { email: '', password: '', rememberMe: false };
  register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  };

  showPassword = signal(false);
  error = signal('');

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  async onLogin(): Promise<void> {
    this.error.set('');

    if (!this.login.email || !this.login.password) {
      this.error.set('Please fill in all fields.');
      return;
    }

    try {
      await this.auth.login(this.login.email, this.login.password);
      this.router.navigate(['/account']);
    } catch (err) {
      this.error.set('Invalid email or password.');
    }
  }

  async onRegister(): Promise<void> {
    this.error.set('');

    if (!this.register.firstName || !this.register.email || !this.register.password) {
      this.error.set('Please fill in all required fields.');
      return;
    }

    if (this.register.password !== this.register.confirmPassword) {
      this.error.set('Passwords do not match.');
      return;
    }

    if (!this.register.agree) {
      this.error.set('Please agree to the terms.');
      return;
    }

    try {
      await this.auth.register(
        this.register.firstName,
        this.register.lastName,
        this.register.email,
        this.register.password
      );
      this.router.navigate(['/account']);
    } catch (err) {
      this.error.set('Registration failed. Try again.');
    }
  }
}