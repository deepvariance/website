import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models';

const STORAGE_KEY = 'dv_auth_token';

const MOCK_USER: User = {
  id: 'usr_01',
  email: 'saai@deepvariance.com',
  name: 'Saai Vignesh',
  orgName: 'Deep Variance',
  orgId: 'org_deepvariance',
  avatarInitials: 'SV',
  plan: 'pro',
  createdAt: '2026-02-15T00:00:00Z',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private readonly _token = signal<string | null>(this.loadToken());
  private readonly _user = signal<User | null>(this._token() ? MOCK_USER : null);

  readonly token = this._token.asReadonly();
  readonly currentUser = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  login(email: string, _password: string): Promise<void> {
    const fakeToken = `mock.${btoa(email)}.${Date.now()}`;
    this.persistToken(fakeToken);
    this._token.set(fakeToken);
    this._user.set({ ...MOCK_USER, email });
    return Promise.resolve();
  }

  signup(name: string, email: string, _password: string): Promise<void> {
    const fakeToken = `mock.${btoa(email)}.${Date.now()}`;
    this.persistToken(fakeToken);
    this._token.set(fakeToken);
    this._user.set({ ...MOCK_USER, name, email });
    return Promise.resolve();
  }

  logout(): void {
    this.clearToken();
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  private loadToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  private persistToken(token: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.setItem(STORAGE_KEY, token); } catch { /* noop */ }
  }

  private clearToken(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
  }
}
