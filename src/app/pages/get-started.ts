import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LucideAngularModule, Check, ArrowRight } from 'lucide-angular';
import { HeroFluidShaderComponent } from '../components/hero-fluid-shader';
import { SeoService } from '../services/seo.service';

function businessEmailValidator(control: AbstractControl): ValidationErrors | null {
  const v = (control.value || '').trim().toLowerCase();
  if (!v) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { invalidEmail: true };
  const blocked = [
    'mailinator', 'yopmail', 'guerrillamail', 'trashmail', 'temp-mail', 'throwaway',
    'maildrop', 'sharklasers', 'spamgourmet', 'mailnull', 'getairmail', 'tempmail',
    'dispostable', 'airmail.cc', 'spam4.me', 'yomail', 'throwam', 'fakeinbox',
    'getnada', '33mail', 'mailexpire', 'spamex', 'spamfree', 'spaml', 'spamoff',
    'tempr.email', 'tempr', 'inboxbear', 'crazymailing', 'emailondeck', 'filzmail',
    'tmail', 'tmpmail', 'moakt',
  ];
  const domain = v.split('@')[1];
  return blocked.some((b) => domain.includes(b)) ? { disposableEmail: true } : null;
}

interface JourneyPhase {
  step: string;
  title: string;
  badge: string;
  summary: string;
  details?: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    HeroFluidShaderComponent,
  ],
  templateUrl: './get-started.html',
  styleUrl: './get-started.scss',
})
export class GetStartedPageComponent {
  readonly Check = Check;
  readonly ArrowRight = ArrowRight;

  private seo = inject(SeoService);
  private fb = inject(FormBuilder);

  formSubmitted = signal(false);
  isSubmitting = signal(false);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, businessEmailValidator]],
    company: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  journeyPhases: JourneyPhase[] = [
    {
      step: '01',
      title: 'Pilot',
      badge: 'Free · 1 week',
      summary:
        'We instrument one representative workload on your hardware, run a baseline without optimization, then enable the module and compare side by side. You receive a written report before any production contract.',
    },
    {
      step: '02',
      title: 'Deployment to prod',
      badge: 'Usage-based',
      summary:
        'When the pilot hits your success bar, we roll the layer into production. Pricing follows recovered value, not seat count.',
      details: [
        'All three modules available in one install',
        '90-day success criteria before full commitment',
        'Dedicated channel for rollout and rollback planning',
      ],
      featured: true,
    },
    {
      step: '03',
      title: 'Monitor and maintain',
      badge: 'Custom SLA',
      summary:
        'After rollout, we help you hold the gains as batch sizes, models, and GPU generations change.',
      details: [
        'Custom SLA and uptime guarantees',
        'Fleet-wide monitoring and regression alerts',
        'Compliance review and on-site handoff when required',
      ],
    },
  ];

  constructor() {
    this.seo.set({
      title: 'Get Started | Deep Variance',
      description: 'Pilot, deploy to production, then monitor and maintain.',
      path: '/get-started',
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    try {
      const formData = this.contactForm.value;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        this.formSubmitted.set(true);
        this.contactForm.reset();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
