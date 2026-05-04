import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Building2,
  Cpu,
  Gauge,
  Layers,
  LucideAngularModule,
  Microscope,
  Server,
  Zap,
} from 'lucide-angular';

import { BlogCardComponent } from '../components/blog-card';
import { SectionHeaderComponent } from '../components/section-header';
import { StatStripComponent } from '../components/stat-strip';
import { StatusPillComponent } from '../components/status-pill';
import { StackVizComponent } from '../components/stack-viz';
import { SanityPost, SanityService } from '../services/sanity.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    BlogCardComponent,
    StatStripComponent,
    SectionHeaderComponent,
    StatusPillComponent,
    StackVizComponent,
  ],
  template: `
    <div class="overflow-x-hidden">

      <!-- ── Hero ─────────────────────────────────────────────────────────── -->
      <section class="relative border-b border-border overflow-hidden">

        <div class="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

        <!-- GPU image: absolute inside the 1440px container so it never bleeds on wide screens -->
        <div class="hidden desk:block absolute inset-y-0 right-0 w-[52%] lg:w-[56%] pointer-events-none select-none">
          <img
            src="/gpu-hero-v3.webp"
            alt=""
            width="1536" height="1024"
            fetchpriority="high"
            class="w-full h-full object-contain object-right gpu-hero-img"
            style="mix-blend-mode:screen;mask-image:linear-gradient(to right,transparent 0%,black 22%,black 100%),linear-gradient(to bottom,black 0%,black 78%,transparent 100%);mask-composite:intersect;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 22%,black 100%),linear-gradient(to bottom,black 0%,black 78%,transparent 100%);-webkit-mask-composite:source-in"
          />
        </div>

          <!-- Below 940px: GPU image full width, stacked above text -->
          <div class="desk:hidden pt-16 -mx-6">
            <img
              src="/gpu-hero-v3.webp"
              alt=""
              width="1536" height="1024"
              class="w-full gpu-hero-img"
              style="mix-blend-mode:screen;opacity:0.9"
            />
          </div>

          <!-- Hero text content -->
          <div class="w-full desk:max-w-[560px] pt-6 desk:pt-32 pb-8 desk:pb-12">
            <h1 class="font-display font-bold tracking-tight text-white text-[2.4rem] sm:text-5xl desk:text-[3.2rem] leading-[1.06] mb-4">
              Your GPUs are fast.<br/>
              The software around<br class="hidden desk:block"/>
              them isn't.
            </h1>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-6 desk:max-w-lg">
              Deep Variance sits between your framework and the hardware driver. It intercepts memory waste, cache misses, and kernel inefficiency before they cost you, without touching your models or your stack.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 mb-6">
              <a routerLink="/pricing" fragment="contact-form" class="dv-btn-primary">Talk to us</a>
              <button (click)="scrollToArch()" class="dv-btn-outline">See the stack</button>
            </div>
            <app-stat-strip [centered]="false" [stats]="heroStats" />
          </div>


        </div>
      </section>

      <!-- Works alongside + Backed by — outside hero to avoid mix-blend-mode compositing glitch -->
      <section class="border-b border-border">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div class="py-4 flex flex-col desk:flex-row desk:items-center desk:justify-between gap-4">
            <div class="flex flex-col desk:flex-row desk:items-center gap-3 desk:gap-8">
              <p class="font-mono text-[10px] uppercase tracking-[0.22em] text-center desk:text-left" style="color:#8a8a8a">Works alongside</p>
              <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                @for (tool of tools; track tool.name) {
                  <img [src]="tool.src" [alt]="tool.name" [width]="tool.w" [height]="tool.h" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" />
                }
              </div>
            </div>
            <div class="flex flex-col desk:flex-row desk:items-center gap-2 desk:gap-3">
              <p class="font-mono text-[10px] uppercase tracking-[0.22em] text-center desk:text-left" style="color:#8a8a8a">Backed by</p>
              <div class="flex justify-center desk:justify-start">
              <svg viewBox="0 0 144 40" xmlns="http://www.w3.org/2000/svg" class="h-5 sm:h-6 w-auto shrink-0" style="opacity:0.55" aria-label="Plug and Play Tech Center">
                <path fill="#ffffff" d="M11.6,23h-1.8v9.1h-3.8V7.8h5.6c3.8,0,5.7,2.1,5.7,6v3.2c0,3.9-1.9,6-5.7,6h0ZM13.5,13.6c0-1.7-.7-2.3-1.9-2.3h-1.8v8.2h1.8c1.2,0,1.9-.6,1.9-2.3v-3.6h0ZM18.8,32.1V7.8h3.8v20.8h6.3v3.5h-10.1ZM35.5,32.4c-3.7,0-5.7-2.2-5.7-6.1V7.8h3.8v18.7c0,1.7.8,2.4,2,2.4s2-.6,2-2.4V7.8h3.6v18.5c0,3.9-1.9,6.1-5.7,6.1h0ZM49,22.1v-3.5h5.3v7.7c0,3.9-1.9,6.1-5.7,6.1s-5.7-2.2-5.7-6.1v-12.6c0-3.9,1.9-6.1,5.7-6.1s5.7,2.2,5.7,6.1v2.4h-3.6v-2.6c0-1.7-.8-2.4-2-2.4s-2,.7-2,2.4v13.1c0,1.7.8,2.4,2,2.4s2-.6,2-2.4v-4.5h-1.7Z"/>
                <path fill="#ffffff" d="M63.3,10.6h-4.3l-3,18.6h2.7l.5-3.4h3.6l.5,3.4h3l-3-18.6h0ZM61,13.9l1.4,9.4h-2.8l1.4-9.4h0Z"/>
                <polygon fill="#ffffff" points="73.5 29.2 76.5 29.2 76.5 10.6 73.9 10.6 73.9 21.7 70.9 10.6 67.2 10.6 67.2 29.2 69.9 29.2 69.9 15.7 73.5 29.2 73.5 29.2"/>
                <path fill="#ffffff" d="M78.2,29.2h4.6c2.9,0,4.4-1.6,4.4-4.6v-9.4c0-3-1.4-4.6-4.4-4.6h-4.6v18.6h0ZM82.8,13.3c.9,0,1.5.5,1.5,1.8v9.7c0,1.3-.6,1.8-1.5,1.8h-1.6v-13.3h1.6Z"/>
                <path fill="#ffffff" d="M94.8,23h-1.8v9.1h-3.8V7.8h5.6c3.8,0,5.7,2.1,5.7,6v3.2c0,3.9-1.9,6-5.7,6h0ZM96.7,13.6c0-1.7-.7-2.3-1.9-2.3h-1.8v8.2h1.8c1.2,0,1.9-.6,1.9-2.3v-3.6h0ZM101.9,32.1V7.8h3.8v20.8h6.3v3.5h-10.1ZM122.9,32.1l-.7-4.4h-4.7l-.7,4.4h-3.5l3.9-24.3h5.6l3.9,24.3h-3.9ZM119.9,12.1l-1.8,12.3h3.7l-1.8-12.3h0ZM133.2,24.1v8h-3.8v-8l-4.8-16.2h4l2.9,11.1,2.9-11.1h3.6l-4.8,16.2h0Z"/>
              </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ ALTERNATING SECTIONS ══════════════════════════════════════════ -->

      <!-- ── Problem · text LEFT · GPU grid RIGHT ──────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          <!-- text column -->
          <div>
            <p class="label-caps mb-4">The problem</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Your framework reports utilization.<br/>It cannot see the waste below it.
            </h2>

            <!-- GPU grid: inline on mobile (after title), hidden on lg (shown in right col) -->
            <div class="lg:hidden flex justify-center mb-6">
              <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-sm h-auto">
                <g fill="none">
                  <rect x="20" y="20" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="66" y="20" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="112" y="20" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="158" y="20" width="38" height="38" rx="3" stroke="#666" stroke-width="1"/><rect x="204" y="20" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="250" y="20" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="296" y="20" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="342" y="20" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                  <rect x="20" y="66" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="66" y="66" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="112" y="66" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="158" y="66" width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/><rect x="204" y="66" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="250" y="66" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="296" y="66" width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/><rect x="342" y="66" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                  <rect x="20" y="112" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="66" y="112" width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/><rect x="112" y="112" width="38" height="38" rx="3" stroke="#909090" stroke-width="1.5" fill="#242424"/><rect x="158" y="112" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="204" y="112" width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/><rect x="250" y="112" width="38" height="38" rx="3" stroke="#909090" stroke-width="1.5" fill="#242424"/><rect x="296" y="112" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="342" y="112" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                  <rect x="20" y="158" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="66" y="158" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="112" y="158" width="38" height="38" rx="3" stroke="#aaa" stroke-width="1.5" fill="#2a2a2a"/><rect x="158" y="158" width="38" height="38" rx="3" stroke="#c0c0c0" stroke-width="2" fill="#2e2e2e"/><rect x="204" y="158" width="38" height="38" rx="3" stroke="#aaa" stroke-width="1.5" fill="#2a2a2a"/><rect x="250" y="158" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="296" y="158" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="342" y="158" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                  <rect x="20" y="204" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="66" y="204" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="112" y="204" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="158" y="204" width="38" height="38" rx="3" stroke="#909090" stroke-width="1.5" fill="#242424"/><rect x="204" y="204" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/><rect x="250" y="204" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="296" y="204" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="342" y="204" width="38" height="38" rx="3" stroke="#404040" stroke-width="0.8"/>
                  <rect x="20" y="250" width="38" height="38" rx="3" stroke="#3a3a3a" stroke-width="0.7"/><rect x="66" y="250" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="112" y="250" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="158" y="250" width="38" height="38" rx="3" stroke="#606060" stroke-width="0.8"/><rect x="204" y="250" width="38" height="38" rx="3" stroke="#555" stroke-width="0.8"/><rect x="250" y="250" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/><rect x="296" y="250" width="38" height="38" rx="3" stroke="#3a3a3a" stroke-width="0.7"/><rect x="342" y="250" width="38" height="38" rx="3" stroke="#303030" stroke-width="0.7"/>
                </g>
                <text x="200" y="310" font-family="IBM Plex Mono,monospace" font-size="8" fill="#6a6a6a" text-anchor="middle" letter-spacing="0.16em">GPU COMPUTE ARRAY</text>
              </svg>
            </div>

            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-4">
              A job running at 95% SM occupancy still leaves up to 43% of GPU capacity unused through fragmentation, cache thrash, and kernel misconfiguration. Framework profilers report what the silicon sees. They stop at the API boundary, the same boundary your bill doesn't.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-6">
              Every observability tool in your stack generates a more detailed report of the same waste. None of them close the gap. By the time the report reaches you, that compute has already been paid for and discarded.
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-lg border border-border p-3 sm:p-4">
                <p class="font-display font-bold text-white text-lg sm:text-xl mb-1">Up to 43%</p>
                <p class="font-mono text-[10px] sm:text-xs text-on-surface-variant">of GPU capacity unused during training and inference</p>
              </div>
              <div class="rounded-lg border border-border p-3 sm:p-4">
                <p class="font-display font-bold text-white text-lg sm:text-xl mb-1">$8-20B</p>
                <p class="font-mono text-[10px] sm:text-xs text-on-surface-variant">recoverable wasted GPU compute globally, per year</p>
              </div>
            </div>
          </div>

          <!-- GPU SM grid illustration (desktop only - right column) -->
          <div class="hidden lg:flex items-center justify-center">
            <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md h-auto">
              <g fill="none">
                <rect x="20"  y="20"  width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="66"  y="20"  width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="112" y="20"  width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="158" y="20"  width="38" height="38" rx="3" stroke="#666666" stroke-width="1"/>
                <rect x="204" y="20"  width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="250" y="20"  width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="296" y="20"  width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="342" y="20"  width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="20"  y="66"  width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="66"  y="66"  width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="112" y="66"  width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="158" y="66"  width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/>
                <rect x="204" y="66"  width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="250" y="66"  width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="296" y="66"  width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/>
                <rect x="342" y="66"  width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="20"  y="112" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="66"  y="112" width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/>
                <rect x="112" y="112" width="38" height="38" rx="3" stroke="#909090" stroke-width="1.5" fill="#242424"/>
                <rect x="158" y="112" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="204" y="112" width="38" height="38" rx="3" stroke="#6a6a6a" stroke-width="1"/>
                <rect x="250" y="112" width="38" height="38" rx="3" stroke="#909090" stroke-width="1.5" fill="#242424"/>
                <rect x="296" y="112" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="342" y="112" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="20"  y="158" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="66"  y="158" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="112" y="158" width="38" height="38" rx="3" stroke="#aaaaaa" stroke-width="1.5" fill="#2a2a2a"/>
                <rect x="158" y="158" width="38" height="38" rx="3" stroke="#c0c0c0" stroke-width="2"   fill="#2e2e2e"/>
                <rect x="204" y="158" width="38" height="38" rx="3" stroke="#aaaaaa" stroke-width="1.5" fill="#2a2a2a"/>
                <rect x="250" y="158" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="296" y="158" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="342" y="158" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="20"  y="204" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="66"  y="204" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="112" y="204" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="158" y="204" width="38" height="38" rx="3" stroke="#909090" stroke-width="1.5" fill="#242424"/>
                <rect x="204" y="204" width="38" height="38" rx="3" stroke="#7a7a7a" stroke-width="1.2" fill="#1e1e1e"/>
                <rect x="250" y="204" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="296" y="204" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="342" y="204" width="38" height="38" rx="3" stroke="#404040" stroke-width="0.8"/>
                <rect x="20"  y="250" width="38" height="38" rx="3" stroke="#3a3a3a" stroke-width="0.7"/>
                <rect x="66"  y="250" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="112" y="250" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="158" y="250" width="38" height="38" rx="3" stroke="#606060" stroke-width="0.8"/>
                <rect x="204" y="250" width="38" height="38" rx="3" stroke="#555555" stroke-width="0.8"/>
                <rect x="250" y="250" width="38" height="38" rx="3" stroke="#484848" stroke-width="0.8"/>
                <rect x="296" y="250" width="38" height="38" rx="3" stroke="#3a3a3a" stroke-width="0.7"/>
                <rect x="342" y="250" width="38" height="38" rx="3" stroke="#303030" stroke-width="0.7"/>
              </g>
              <text x="200" y="310" font-family="IBM Plex Mono,monospace" font-size="8" fill="#6a6a6a" text-anchor="middle" letter-spacing="0.16em">GPU COMPUTE ARRAY</text>
            </svg>
          </div>

        </div>
      </section>

      <!-- ── Solution · arch diagram LEFT · text RIGHT ─────────────────────── -->
      <section id="arch" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <!-- text (first in DOM = shows first on mobile, ordered right on lg) -->
          <div class="order-1 lg:order-2">
            <p class="label-caps mb-4">The solution</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              One stack. Below everything.<br/>Works everywhere.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-8">
              Deep Variance lives below your framework at the driver boundary, the one layer all native SDKs skip. It reads your live workload in real time and reclaims the compute your framework never reaches, on every job, automatically.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="font-mono text-xs text-outline mt-0.5 shrink-0">01</span>
                <div>
                  <p class="font-mono text-sm text-white mb-0.5">Not monitoring. Preventing.</p>
                  <p class="font-mono text-sm text-on-surface-variant">Every other tool reports waste after the fact. Deep Variance closes the gap before the compute leaves the system.</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="font-mono text-xs text-outline mt-0.5 shrink-0">02</span>
                <div>
                  <p class="font-mono text-sm text-white mb-0.5">Hardware-agnostic. Framework-agnostic.</p>
                  <p class="font-mono text-sm text-on-surface-variant">The same stack runs under PyTorch, TensorFlow, and JAX on NVIDIA H100, A100, and AMD MI300X. Switching vendors changes nothing about your install.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- arch diagram (second in DOM = shows after text on mobile, ordered left on lg) -->
          <div class="order-2 lg:order-1">
            <app-stack-viz />
          </div>

        </div>
      </section>

      <!-- ── Products ─────────────────────────────────────────────────────── -->
      <section id="stack" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <app-section-header
          eyebrow="What ships"
          subhead="Three layers. Each targets a distinct class of GPU waste at runtime, without retraining or migrating your model."
        >
          The three layers.
        </app-section-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <a routerLink="/optimemory" class="dv-product-card dv-card group rounded-xl p-6 flex flex-col">
            <div class="flex items-center justify-between mb-5">
              <div class="dv-product-icon !mb-0"><lucide-icon [img]="Server" [size]="18" /></div>
              <app-status-pill variant="live">Live</app-status-pill>
            </div>
            <h3 class="font-display text-lg font-semibold text-white mb-1">Optimemory</h3>
            <p class="label-mono mb-5">Memory Layer</p>
            <div class="dv-metric-tile mb-5">
              <p class="font-display font-bold text-white text-4xl leading-none mb-1.5">+65%</p>
              <p class="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">more effective memory</p>
            </div>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed mb-4">
              Your GPUs hold more memory than they can use. Optimemory reclaims it at the driver layer and hands it back to your workloads, automatically, on every job.
            </p>
            <div class="dv-product-footer">
              <span class="font-mono text-[11px] text-outline">PyTorch · CUDA 12 · DDP · FSDP</span>
              <span class="dv-arrow">Learn more <lucide-icon [img]="ArrowRight" [size]="12" /></span>
            </div>
          </a>

          <a routerLink="/hyperrag" class="dv-product-card dv-card group rounded-xl p-6 flex flex-col">
            <div class="flex items-center justify-between mb-5">
              <div class="dv-product-icon !mb-0"><lucide-icon [img]="Gauge" [size]="18" /></div>
              <app-status-pill variant="beta">Beta</app-status-pill>
            </div>
            <h3 class="font-display text-lg font-semibold text-white mb-1">HyperRAG</h3>
            <p class="label-mono mb-5">KV Cache Layer</p>
            <div class="dv-metric-tile mb-5">
              <p class="font-display font-bold text-white text-4xl leading-none mb-1.5">6x</p>
              <p class="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">faster first token</p>
            </div>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed mb-4">
              LLM responses feel instant when context is already in cache. HyperRAG reuses shared document prefixes so your inference server never recomputes what it has already seen.
            </p>
            <div class="dv-product-footer">
              <span class="font-mono text-[11px] text-outline">vLLM · SGLang · TensorRT-LLM</span>
              <span class="dv-arrow">Learn more <lucide-icon [img]="ArrowRight" [size]="12" /></span>
            </div>
          </a>

          <a routerLink="/deeptuner" class="dv-product-card dv-card group rounded-xl p-6 flex flex-col">
            <div class="flex items-center justify-between mb-5">
              <div class="dv-product-icon !mb-0"><lucide-icon [img]="Zap" [size]="18" /></div>
              <app-status-pill variant="preview">Early</app-status-pill>
            </div>
            <h3 class="font-display text-lg font-semibold text-white mb-1">DeepTuner</h3>
            <p class="label-mono mb-5">Kernel Layer</p>
            <div class="dv-metric-tile mb-5">
              <p class="font-display font-bold text-white text-4xl leading-none mb-1.5">-50%</p>
              <p class="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">less energy per token</p>
            </div>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed mb-4">
              Every kernel ships with a default configuration that wasn't tuned for your hardware. DeepTuner reads your actual workload and fixes that before the first job runs.
            </p>
            <div class="dv-product-footer">
              <span class="font-mono text-[11px] text-outline">H100 · A100 · RTX 5000 Ada</span>
              <span class="dv-arrow">Learn more <lucide-icon [img]="ArrowRight" [size]="12" /></span>
            </div>
          </a>

        </div>
      </section>

      <!-- ── Integration ────────────────────────────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="mb-10 md:mb-14 max-w-2xl">
          <p class="label-caps mb-4">Integration</p>
          <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-5">
            Deploy once.<br/>Nothing else changes.
          </h2>
          <p class="font-mono text-base text-on-surface-variant leading-relaxed">
            No new cluster component, no network change, no new orchestration layer. Savings are measurable from the first job.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
          <div class="bg-background p-6 md:p-7 flex flex-col">
            <span class="font-mono text-[10px] text-outline uppercase tracking-[0.18em] mb-4">Step 01</span>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Add to your existing container image. No sidecar, no daemon, no new service to maintain.
            </p>
          </div>

          <div class="bg-background p-6 md:p-7 flex flex-col">
            <span class="font-mono text-[10px] text-outline uppercase tracking-[0.18em] mb-4">Step 02</span>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Deep Variance runs at the kernel and memory allocation layer, below the abstraction your model ever sees. Weights, training loop, and inference code are unchanged.
            </p>
          </div>

          <div class="bg-background p-6 md:p-7 flex flex-col">
            <span class="font-mono text-[10px] text-outline uppercase tracking-[0.18em] mb-4">Step 03</span>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Runs inside the same job scheduler and orchestration layer you already operate. No Kubernetes operator, no new network topology, no privilege escalation required.
            </p>
          </div>

          <div class="bg-background p-6 md:p-7 flex flex-col">
            <span class="font-mono text-[10px] text-outline uppercase tracking-[0.18em] mb-4">Step 04</span>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Measurable VRAM recovery and throughput gains appear from the first job. No warm-up period, no tuning phase.
            </p>
          </div>
        </div>
      </section>

      <!-- ── Benchmarks · bars LEFT · text RIGHT ────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="dv-panel rounded-xl p-8 md:p-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <!-- bars (8 cols, ordered left on lg, after text on mobile) -->
            <div class="lg:col-span-8 space-y-6 order-2 lg:order-1">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-xs text-outline uppercase tracking-widest">VRAM Utilization · Optimemory</span>
                  <span class="font-mono text-xs text-white">38% to 98%</span>
                </div>
                <div class="space-y-1.5">
                  <div class="relative h-6 rounded-sm overflow-hidden bg-neutral-950">
                    <div class="absolute inset-y-0 left-0 bg-neutral-800 rounded-sm flex items-center px-2" style="width:38%">
                      <span class="font-mono text-[10px] text-neutral-500">BEFORE</span>
                    </div>
                  </div>
                  <div class="relative h-6 rounded-sm overflow-hidden bg-neutral-950">
                    <div class="absolute inset-y-0 left-0 bg-white rounded-sm flex items-center justify-end px-2" style="width:98%">
                      <span class="font-mono text-[10px] text-black font-semibold">AFTER · +65%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-xs text-outline uppercase tracking-widest">First Token Time · HyperRAG</span>
                  <span class="font-mono text-xs text-white">57 ms to 9.8 ms</span>
                </div>
                <div class="space-y-1.5">
                  <div class="relative h-6 rounded-sm overflow-hidden bg-neutral-950">
                    <div class="absolute inset-y-0 left-0 bg-neutral-800 rounded-sm flex items-center px-2" style="width:100%">
                      <span class="font-mono text-[10px] text-neutral-500">BEFORE · 57 ms</span>
                    </div>
                  </div>
                  <div class="relative h-6 rounded-sm overflow-hidden bg-neutral-950">
                    <div class="absolute inset-y-0 left-0 bg-white rounded-sm flex items-center justify-end px-2" style="width:17%"></div>
                    <span class="absolute left-[19%] top-1/2 -translate-y-1/2 font-mono text-[10px] text-white font-semibold">AFTER · 9.8 ms (6x faster)</span>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-xs text-outline uppercase tracking-widest">Energy per Token · DeepTuner</span>
                  <span class="font-mono text-xs text-white">250 W to 125 W</span>
                </div>
                <div class="space-y-1.5">
                  <div class="relative h-6 rounded-sm overflow-hidden bg-neutral-950">
                    <div class="absolute inset-y-0 left-0 bg-neutral-800 rounded-sm flex items-center px-2" style="width:100%">
                      <span class="font-mono text-[10px] text-neutral-500">BEFORE · 250 W</span>
                    </div>
                  </div>
                  <div class="relative h-6 rounded-sm overflow-hidden bg-neutral-950">
                    <div class="absolute inset-y-0 left-0 bg-white rounded-sm flex items-center justify-end px-2" style="width:50%"></div>
                    <span class="absolute left-[52%] top-1/2 -translate-y-1/2 font-mono text-[10px] text-white font-semibold">AFTER · 125 W (-50%)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- text label (4 cols, shows first on mobile, ordered right on lg) -->
            <div class="lg:col-span-4 order-1 lg:order-2">
              <p class="label-caps mb-3">Benchmarked results</p>
              <h2 class="font-display font-bold text-white text-2xl md:text-3xl leading-tight tracking-tight mb-4">
                Real numbers.<br/>Real hardware.
              </h2>
              <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                Measured on production-class NVIDIA GPUs. No synthetic workloads. No cherry-picked configurations. Methodology available on request.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- ── Fleet ROI ──────────────────────────────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="max-w-3xl mb-10 md:mb-14">
          <p class="label-caps mb-4">Fleet ROI</p>
          <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-5">
            What does this look like<br/>on your cluster?
          </h2>
          <p class="font-mono text-base text-on-surface-variant leading-relaxed">
            Scenarios derived from our benchmarks. Numbers assume a full workload mix of training, fine-tuning, and inference across the cluster.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="dv-panel rounded-xl p-6 md:p-8 flex flex-col">
            <span class="label-mono mb-5">100 x H100 · Training</span>
            <div class="mb-6">
              <p class="font-display font-bold text-white text-3xl md:text-4xl leading-none mb-1">15-25%</p>
              <p class="font-mono text-xs text-on-surface-variant uppercase tracking-widest">of GPU spend recovered</p>
            </div>
            <div class="space-y-2.5 mb-5">
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Annual GPU cost (est.)</span>
                <span class="font-mono text-xs text-white">$2.5M</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Recovery range</span>
                <span class="font-mono text-xs text-white">$375K-$625K / yr</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Source</span>
                <span class="font-mono text-xs text-white">GMLake ASPLOS '24</span>
              </div>
            </div>
            <div class="mt-auto pt-4 border-t border-border">
              <p class="font-mono text-xs text-outline">No new hardware required</p>
            </div>
          </div>

          <div class="dv-panel rounded-xl p-6 md:p-8 flex flex-col">
            <span class="label-mono mb-5">500 x A100 · Inference</span>
            <div class="mb-6">
              <p class="font-display font-bold text-white text-3xl md:text-4xl leading-none mb-1">-83%</p>
              <p class="font-mono text-xs text-on-surface-variant uppercase tracking-widest">fleet cost to serve the same load</p>
            </div>
            <div class="space-y-2.5 mb-5">
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">GPUs to match this throughput (before)</span>
                <span class="font-mono text-xs text-white">3,000</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">GPUs with Deep Variance</span>
                <span class="font-mono text-xs text-white">500</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Traffic spike headroom</span>
                <span class="font-mono text-xs text-white">6x buffer, no over-provisioning</span>
              </div>
            </div>
            <div class="mt-auto pt-4 border-t border-border">
              <p class="font-mono text-xs text-outline">No additional GPU procurement required</p>
            </div>
          </div>

          <div class="dv-panel rounded-xl p-6 md:p-8 flex flex-col">
            <span class="label-mono mb-5">2000 x MI300X · Mixed</span>
            <div class="mb-6">
              <p class="font-display font-bold text-white text-3xl md:text-4xl leading-none mb-1">$4.5-7.5M</p>
              <p class="font-mono text-xs text-on-surface-variant uppercase tracking-widest">recovered per year</p>
            </div>
            <div class="space-y-2.5 mb-5">
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Annual GPU cost (est.)</span>
                <span class="font-mono text-xs text-white">$30M+</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Recovery range</span>
                <span class="font-mono text-xs text-white">15-25%</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="font-mono text-xs text-outline">Heterogeneous fleet</span>
                <span class="font-mono text-xs text-white">AMD supported, no extra config</span>
              </div>
            </div>
            <div class="mt-auto pt-4 border-t border-border">
              <p class="font-mono text-xs text-outline">Scales with cluster size, linearly</p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <a routerLink="/pricing" fragment="contact-form" class="font-mono text-xs text-white underline underline-offset-4 decoration-neutral-700 hover:decoration-white transition-colors">Get the model for your fleet</a>
        </div>
      </section>

      <!-- ── Competitive ────────────────────────────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="max-w-3xl mb-10 md:mb-14">
          <p class="label-caps mb-4">Competitive position</p>
          <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight">
            Three categories. One gap.
          </h2>
        </div>

        <div class="dv-panel rounded-xl divide-y divide-border">
          <div class="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 items-start p-6 md:p-8">
            <div>
              <p class="font-display font-semibold text-white text-sm mb-0.5">Monitoring stacks</p>
              <p class="font-mono text-[11px] text-outline">Nsight, DCGM, Prometheus</p>
            </div>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              Show you where the waste is. They cannot act on it. A dashboard reporting low utilization costs the same $0 to read and $0 to fix, because fixing is not what it does.
            </p>
            <span class="dv-comp-pill dv-comp-no shrink-0">NO RECOVERY</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 items-start p-6 md:p-8">
            <div>
              <p class="font-display font-semibold text-white text-sm mb-0.5">DIY kernel tuning</p>
              <p class="font-mono text-[11px] text-outline">In-house CUDA/Triton work</p>
            </div>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              Works on one kernel at a time and doesn't survive your next model, hardware generation, or framework update. Requires senior CUDA expertise to maintain continuously.
            </p>
            <span class="dv-comp-pill dv-comp-partial shrink-0">PARTIAL</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 items-start p-6 md:p-8 bg-white/[0.02]">
            <div>
              <p class="font-display font-semibold text-white text-sm mb-0.5">Deep Variance</p>
              <p class="font-mono text-[11px] text-outline">Driver-boundary layer</p>
            </div>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              Operates at the layer where the waste actually lives. The gains persist through model migrations, hardware vendor switches, and framework upgrades without any reinstall or reconfiguration.
            </p>
            <span class="dv-comp-pill dv-comp-yes shrink-0">FULL</span>
          </div>
        </div>
      </section>

      <!-- ── Who it's for ──────────────────────────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <app-section-header
          eyebrow="Who it's for"
          subhead="If you run GPUs at scale, one of these is you. The savings start on the first production job."
        >
          Built for teams running GPUs at scale.
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a routerLink="/deeptuner" class="dv-card rounded-xl p-6 flex flex-col">
            <div class="dv-vertical-icon mb-5"><lucide-icon [img]="Layers" [size]="16" /></div>
            <span class="label-caps mb-4">HPC Clusters</span>
            <p class="font-display font-bold text-white text-3xl mb-1">-50%</p>
            <p class="label-mono mb-4">energy per token</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              Kernels that tune themselves to your job. Long-running workloads stop compounding inefficiency across every epoch.
            </p>
          </a>
          <a routerLink="/use-cases" fragment="gpu-providers" class="dv-card rounded-xl p-6 flex flex-col">
            <div class="dv-vertical-icon mb-5"><lucide-icon [img]="Cpu" [size]="16" /></div>
            <span class="label-caps mb-4">GPU Cloud Providers</span>
            <p class="font-display font-bold text-white text-3xl mb-1">+38%</p>
            <p class="label-mono mb-4">fleet utilisation</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              Tenants over-provision to stay safe. Optimemory eliminates stranded VRAM and gives that headroom back as usable, billable capacity.
            </p>
          </a>
          <a routerLink="/use-cases" fragment="enterprise-training" class="dv-card rounded-xl p-6 flex flex-col">
            <div class="dv-vertical-icon mb-5"><lucide-icon [img]="Building2" [size]="16" /></div>
            <span class="label-caps mb-4">Enterprise AI Teams</span>
            <p class="font-display font-bold text-white text-3xl mb-1">11w</p>
            <p class="label-mono mb-4">pipelines down to 3 days</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              DeepTuner predicts optimal kernel configurations before your job starts. No more waiting for profiling sweeps to finish.
            </p>
          </a>
          <a routerLink="/use-cases" fragment="research-institutions" class="dv-card rounded-xl p-6 flex flex-col">
            <div class="dv-vertical-icon mb-5"><lucide-icon [img]="Microscope" [size]="16" /></div>
            <span class="label-caps mb-4">Research Labs</span>
            <p class="font-display font-bold text-white text-3xl mb-1">2x</p>
            <p class="label-mono mb-4">model capacity, same budget</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              Run the next model size up on hardware you already own. Optimemory recovers the memory your framework fragmented and never returned to the allocator.
            </p>
          </a>
        </div>
      </section>

      <!-- ── Trust block ────────────────────────────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 border-t border-border">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
          <div class="bg-background px-6 py-7 flex flex-col gap-2">
            <span class="font-mono text-[10px] uppercase tracking-[0.18em]" style="color:#8a8a8a">Backed by</span>
            <p class="font-display font-semibold text-white text-lg">Plug and Play</p>
            <p class="font-mono text-xs text-on-surface-variant leading-relaxed">
              Part of Plug and Play Tech Center's AI and enterprise cohort.
            </p>
          </div>
          <div class="bg-background px-6 py-7 flex flex-col gap-2">
            <span class="font-mono text-[10px] text-outline uppercase tracking-[0.18em]">Founders ship</span>
            <p class="font-display font-semibold text-white text-lg">Engineering-led</p>
            <p class="font-mono text-xs text-on-surface-variant leading-relaxed">
              The people who built the stack are the people on your call. No sales layer between the technology and the conversation.
            </p>
          </div>
          <div class="bg-background px-6 py-7 flex flex-col gap-2">
            <span class="font-mono text-[10px] text-outline uppercase tracking-[0.18em]">Methodology</span>
            <p class="font-display font-semibold text-white text-lg">Public on request</p>
            <p class="font-mono text-xs text-on-surface-variant leading-relaxed">
              Benchmark hardware configs and workload profiles shared with anyone evaluating the stack. No hidden assumptions.
            </p>
          </div>
        </div>
      </section>

      <!-- ── Blog ─────────────────────────────────────────────────────────── -->
      @if (latestPosts() !== null && latestPosts()!.length > 0) {
        <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
          <app-section-header
            eyebrow="From the lab"
            subhead="Research notes and engineering deep-dives from the Deep Variance team."
          >
            Notes from the trenches.
          </app-section-header>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (post of latestPosts()!; track post.slug) {
              <app-blog-card [post]="post" />
            }
          </div>
          <div class="text-center mt-10">
            <a routerLink="/blog" class="dv-btn-outline inline-flex">View all articles</a>
          </div>
        </section>
      }

      <!-- ── CTA ──────────────────────────────────────────────────────────── -->
      <section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-t border-border">
        <div class="dv-panel rounded-xl px-8 py-14 md:px-16 md:py-20 text-center">
          <h2 class="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight mb-5 max-w-2xl mx-auto leading-tight">
            Tell us your GPU setup.
          </h2>
          <p class="font-mono text-base text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We will walk through your specific fleet, identify where the waste lives, and show you exactly how much you will get back. Investors, operators, and evaluating engineers are all welcome.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a routerLink="/pricing" fragment="contact-form" class="dv-btn-primary">
              Talk to the founders
            </a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    :host { display: block; }

    .dv-product-icon {
      margin-bottom: 1.25rem;
      display: inline-flex; align-items: center; justify-content: center;
      width: 2.5rem; height: 2.5rem; border-radius: 0.5rem;
      background: #111111; border: 1px solid #2a2a2a; color: #737373;
    }

    .dv-metric-tile {
      border-radius: 0.5rem; border: 1px solid #1a1a1a;
      background: #060606; padding: 1.1rem 1.1rem 1rem;
      transition: border-color 200ms ease, background 200ms ease;
    }
    .dv-product-card:hover .dv-metric-tile {
      border-color: #404040; background: #0b0b0b;
    }

    .dv-product-footer {
      margin-top: auto; padding-top: 1.25rem;
      border-top: 1px solid #1a1a1a;
      display: flex; align-items: center; justify-content: space-between;
    }

    .dv-arrow {
      display: inline-flex; align-items: center; gap: 0.3rem;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 12px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.1em;
      color: #737373; transition: color 180ms ease, transform 180ms ease;
    }
    .dv-product-card:hover .dv-arrow { color: #ffffff; transform: translateX(3px); }

    .dv-vertical-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 2.25rem; height: 2.25rem; border-radius: 0.5rem;
      background: #111111; border: 1px solid #2a2a2a; color: #737373;
    }

    .dv-comp-pill {
      display: inline-block; padding: 0.3rem 0.75rem;
      border-radius: 999px; font-family: 'IBM Plex Mono', ui-monospace, monospace;
      font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
      white-space: nowrap;
    }
    .dv-comp-yes     { background: #ffffff; color: #000000; border: 1px solid #ffffff; }
    .dv-comp-no      { background: transparent; color: #737373; border: 1px solid #2a2a2a; }
    .dv-comp-partial { background: transparent; color: #a3a3a3; border: 1px solid #404040; }
  `],
})
export class HomeComponent implements OnInit {
  private readonly sanity = inject(SanityService);
  private readonly seo = inject(SeoService);
  private readonly scroller = inject(ViewportScroller);

  readonly latestPosts = signal<SanityPost[] | null>(null);

  readonly heroStats = [
    { value: '6x',  qualifier: 'up to', label: 'LLM response', highlight: false },
    { value: '50%', qualifier: 'up to', label: 'Energy costs', highlight: false },
    { value: '65%', qualifier: 'up to', label: 'More memory',  highlight: false },
  ];

  readonly tools = [
    { name: 'PyTorch',    src: '/pytorch-logo.webp',    w: 324, h: 80 },
    { name: 'TensorFlow', src: '/tensorflow-logo.webp', w: 410, h: 80 },
    { name: 'vLLM',       src: '/vllm-logo.webp',       w: 280, h: 80 },
    { name: 'SGLang',     src: '/sglang-logo.webp',     w: 262, h: 80 },
  ];

  readonly ArrowRight = ArrowRight;
  readonly Server = Server;
  readonly Gauge = Gauge;
  readonly Zap = Zap;
  readonly Cpu = Cpu;
  readonly Layers = Layers;
  readonly Building2 = Building2;
  readonly Microscope = Microscope;


  constructor() {
    this.seo.set({
      title: 'Deep Variance | AI Infra Optimization',
      description:
        'Deep Variance recovers up to 65% of wasted GPU compute without touching your models or infrastructure.',
      path: '/',
    });
  }

  scrollToArch(): void { this.scroller.scrollToAnchor('arch'); }

  ngOnInit(): void {
    this.sanity.getPosts(3).subscribe({
      next: (posts) => this.latestPosts.set(posts),
      error: () => this.latestPosts.set([]),
    });
  }
}
