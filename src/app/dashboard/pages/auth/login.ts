import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, LucideAngularModule],
  template: `
    <div class="auth-page">
      <div class="auth-brand-panel">
        <div class="auth-brand-inner">
          <a routerLink="/" class="auth-logo">Deep Variance</a>
          <div>
            <p class="auth-headline">Inference API<br>for serious<br>builders.</p>
            <p class="auth-sub">In-house kernel optimizations.<br>Prefix caching. Transparent pricing.</p>
          </div>
          <div class="auth-stats">
            <div class="auth-stat"><span class="auth-stat-val">2.1s</span><span class="auth-stat-label">p50 TTFT @32K</span></div>
            <div class="auth-stat"><span class="auth-stat-val">$0.70</span><span class="auth-stat-label">per 1M output</span></div>
            <div class="auth-stat"><span class="auth-stat-val">27B</span><span class="auth-stat-label">flagship model</span></div>
          </div>
        </div>
      </div>

      <div class="auth-form-panel">
        <div class="auth-form-inner">
          <a routerLink="/" class="auth-logo auth-logo--mobile">Deep Variance</a>
          <h1 class="auth-title">Sign in</h1>
          <p class="auth-caption">No account? <a routerLink="/signup" class="auth-link">Create one &rarr;</a></p>

          @if (error()) {
            <div class="auth-error">{{ error() }}</div>
          }

          <form (ngSubmit)="submit()" class="auth-fields">
            <div class="auth-field">
              <label class="auth-label">Email</label>
              <input type="email" name="email" [(ngModel)]="email" required autocomplete="email" placeholder="you@example.com" class="auth-input" />
            </div>
            <div class="auth-field">
              <label class="auth-label">Password</label>
              <div class="auth-input-wrap">
                <input [type]="showPass() ? 'text' : 'password'" name="password" [(ngModel)]="password" required autocomplete="current-password" placeholder="Password" class="auth-input" />
                <button type="button" class="auth-eye" (click)="showPass.set(!showPass())" aria-label="Toggle password visibility">
                  <lucide-icon [img]="showPass() ? EyeOff : Eye" [size]="14" />
                </button>
              </div>
            </div>
            <button type="submit" class="btn-primary btn--lg auth-submit" [disabled]="loading()">
              @if (loading()) { Signing in\u2026 } @else { Sign in <lucide-icon [img]="ArrowRight" [size]="14" /> }
            </button>
          </form>
          <p class="auth-demo-note">Demo: enter any email + password to continue</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { display: flex; min-height: 100vh; min-height: 100svh; background: #000; }
    .auth-brand-panel { display: none; flex: 0 0 420px; background: var(--panel-fill); border-right: 1px solid rgba(255,255,255,0.06); padding: 48px 40px; align-items: center; }
    @media (min-width: 900px) { .auth-brand-panel { display: flex; } }
    .auth-brand-inner { display: flex; flex-direction: column; gap: 48px; }
    .auth-logo { font-family: var(--font-display,sans-serif); font-weight: 700; font-size: 18px; color: var(--text-primary); text-decoration: none; letter-spacing: -0.01em; }
    .auth-logo--mobile { display: block; margin-bottom: 36px; }
    @media (min-width: 900px) { .auth-logo--mobile { display: none; } }
    .auth-headline { font-family: var(--font-display,sans-serif); font-weight: 700; font-size: 30px; color: var(--text-primary); line-height: 1.2; letter-spacing: -0.02em; }
    .auth-sub { font-family: var(--font-body); font-size: 13px; color: var(--text-muted); margin-top: 12px; line-height: 1.6; }
    .auth-stats { display: flex; gap: 24px; }
    .auth-stat { display: flex; flex-direction: column; gap: 3px; }
    .auth-stat-val { font-family: var(--font-display,sans-serif); font-weight: 700; font-size: 22px; color: var(--text-primary); }
    .auth-stat-label { font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); }
    .auth-form-panel { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 24px; }
    .auth-form-inner { width: 100%; max-width: 380px; }
    .auth-title { font-family: var(--font-display,sans-serif); font-size: 24px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 6px; }
    .auth-caption { font-family: var(--font-body); font-size: 13px; color: var(--text-muted); margin-bottom: 28px; }
    .auth-link { color: var(--text-primary); text-underline-offset: 3px; }
    .auth-error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); border-radius: 6px; padding: 10px 14px; font-family: var(--font-body); font-size: 12px; color: #fca5a5; margin-bottom: 16px; }
    .auth-fields { display: flex; flex-direction: column; gap: 16px; }
    .auth-field { display: flex; flex-direction: column; gap: 6px; }
    .auth-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
    .auth-input-wrap { position: relative; }
    .auth-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 10px 14px; font-family: var(--font-body); font-size: 13px; color: var(--text-primary); outline: none; transition: border-color 150ms; }
    .auth-input::placeholder { color: var(--text-faint); }
    .auth-input:focus { border-color: rgba(255,255,255,0.3); }
    .auth-eye { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 2px; }
    .auth-submit { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 8px; width: 100%; }
    .auth-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .auth-demo-note { font-family: var(--font-body); font-size: 11px; color: var(--text-faint); text-align: center; margin-top: 20px; opacity: 0.8; }
  `],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly ArrowRight = ArrowRight;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  email = '';
  password = '';
  readonly loading = signal(false);
  readonly error = signal('');
  readonly showPass = signal(false);

  async submit() {
    if (!this.email || !this.password) { this.error.set('Please enter your email and password.'); return; }
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch {
      this.error.set('Invalid credentials. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
