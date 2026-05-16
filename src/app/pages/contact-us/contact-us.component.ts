import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  form = { name: '', email: '', subject: '', message: '' };
  submitted = signal(false);
  sending = signal(false);

  subjects = [
    'General Enquiry',
    'Order Support',
    'Returns & Exchanges',
    'Personal Styling',
    'Press & Media',
    'Wholesale',
  ];

  contactInfo = [
    { icon: 'location_on', title: 'Visit Us', lines: ['123 Avenue Montaigne', 'New York, NY 10001'] },
    { icon: 'phone', title: 'Call Us', lines: ['+1 (800) GlamFit-BTQ', 'Mon – Sat, 10am – 7pm EST'] },
    { icon: 'mail', title: 'Email Us', lines: ['hello@GlamFitboutique.com', 'Response within 24 hours'] },
  ];

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
    }, 1200);
  }

  reset(): void {
    this.form = { name: '', email: '', subject: '', message: '' };
    this.submitted.set(false);
  }
}