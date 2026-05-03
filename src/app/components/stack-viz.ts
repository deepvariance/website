import { Component } from '@angular/core';

/**
 * Architecture diagram. Uses SVG SMIL animateMotion for data-packet flow.
 * Respects prefers-reduced-motion.
 */
@Component({
  selector: 'app-stack-viz',
  standalone: true,
  template: `
    <div class="stack-viz-wrap" aria-hidden="true">
      <svg viewBox="0 0 480 532" xmlns="http://www.w3.org/2000/svg"
           class="w-full h-auto" style="max-height:532px">
        <defs>
          <style>@media(prefers-reduced-motion:reduce){.fp{display:none}}</style>

          <!-- ── Brand icons (24×24) ───────────────────────────────────────── -->
          <symbol id="ic-meta" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a7 7 0 0 0 .265.86a5.3 5.3 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927c1.497 0 2.633-.671 3.965-2.444c.76-1.012 1.144-1.626 2.663-4.32l.756-1.339l.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314c1.046.987 1.992 1.22 3.06 1.22c1.075 0 1.876-.355 2.455-.843a3.7 3.7 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745c0-2.72-.681-5.357-2.084-7.45c-1.282-1.912-2.957-2.93-4.716-2.93c-1.047 0-2.088.467-3.053 1.308c-.652.57-1.257 1.29-1.82 2.05c-.69-.875-1.335-1.547-1.958-2.056c-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999c1.132 1.748 1.647 4.195 1.647 6.4c0 1.548-.368 2.9-1.839 2.9c-.58 0-1.027-.23-1.664-1.004c-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a45 45 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327c1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446c.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338c-1.191 1.649-1.81 1.817-2.486 1.817c-.524 0-1.038-.237-1.383-.794c-.263-.426-.464-1.13-.464-2.046c0-2.221.63-4.535 1.66-6.088c.454-.687.964-1.226 1.533-1.533a2.26 2.26 0 0 1 1.088-.285"/>
          </symbol>
          <symbol id="ic-gemini" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68q.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58a12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68q-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96q2.19.93 3.81 2.55t2.55 3.81"/>
          </symbol>
          <symbol id="ic-openai" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.282 9.821a6 6 0 0 0-.516-4.91a6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9a6.05 6.05 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206a6 6 0 0 0 3.997-2.9a6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081l4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354l-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023l-.141-.085l-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v2.999l-2.597 1.5l-2.607-1.5Z"/>
          </symbol>
          <symbol id="ic-anthropic" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.369 3.553h3.744L10.536 3.541Zm-.371 10.223L8.616 7.82l2.291 5.945Z"/>
          </symbol>
          <symbol id="ic-pytorch" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 14.022a9.866 9.866 0 0 0 14.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0s-2.904-7.634 0-10.538l4.647-4.646l.582-.665zm3.568 3.899a1.327 1.327 0 0 0-1.327 1.327a1.327 1.327 0 0 0 1.327 1.328A1.327 1.327 0 0 0 16.9 5.226A1.327 1.327 0 0 0 15.573 3.9z"/>
          </symbol>
          <symbol id="ic-tensorflow" viewBox="0 0 24 24">
            <path fill="currentColor" d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564l.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788l-.018-4.618l-3.074-1.756V7.603z"/>
          </symbol>
          <symbol id="ic-nvidia" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.948 8.798v-1.43a7 7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851a3.7 3.7 0 0 1-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6 6 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964a6.5 6.5 0 0 1-1.095-.097v1.325c.3.035.61.062.91.062c3.957 0 6.82-2.023 9.593-4.408c.459.371 2.34 1.263 2.73 1.652c-2.633 2.208-8.772 3.984-12.253 3.984c-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936"/>
          </symbol>

          <!-- ── Product icons (matching home.ts product cards) ──────────────── -->
          <!-- Optimemory → lucide:server -->
          <symbol id="ic-optimemory" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <rect width="20" height="8" x="2" y="2"  rx="2" ry="2"/>
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
              <path d="M6 6h.01M6 18h.01"/>
            </g>
          </symbol>
          <!-- HyperRAG → lucide:gauge -->
          <symbol id="ic-hyperrag" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"/>
          </symbol>
          <!-- DeepTuner → lucide:zap -->
          <symbol id="ic-deeptuner" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
          </symbol>
          <!-- JAX: isometric cube (evokes JAX's 3D block logo) -->
          <symbol id="ic-jax" viewBox="0 0 16 16">
            <path d="M8,0 L16,4 L8,8 L0,4 Z"    fill="currentColor" opacity="1"/>
            <path d="M0,4 L8,8 L8,16 L0,12 Z"   fill="currentColor" opacity="0.5"/>
            <path d="M8,8 L16,4 L16,12 L8,16 Z" fill="currentColor" opacity="0.28"/>
          </symbol>
          <!-- GPU chip (for driver layer) -->
          <symbol id="ic-chip" viewBox="0 0 16 16">
            <rect x="4" y="4" width="8" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/>
            <line x1="1" y1="6.5" x2="4" y2="6.5" stroke="currentColor" stroke-width="1"/>
            <line x1="1" y1="9.5" x2="4" y2="9.5" stroke="currentColor" stroke-width="1"/>
            <line x1="12" y1="6.5" x2="15" y2="6.5" stroke="currentColor" stroke-width="1"/>
            <line x1="12" y1="9.5" x2="15" y2="9.5" stroke="currentColor" stroke-width="1"/>
            <line x1="6.5" y1="1"  x2="6.5" y2="4"  stroke="currentColor" stroke-width="1"/>
            <line x1="9.5" y1="1"  x2="9.5" y2="4"  stroke="currentColor" stroke-width="1"/>
            <line x1="6.5" y1="12" x2="6.5" y2="15" stroke="currentColor" stroke-width="1"/>
            <line x1="9.5" y1="12" x2="9.5" y2="15" stroke="currentColor" stroke-width="1"/>
            <rect x="6" y="6" width="4" height="4" rx="0.5" fill="currentColor"/>
          </symbol>

          <!-- ── animateMotion flow paths ───────────────────────────────────── -->
          <!-- Models → Frameworks (24px, quieter at top of hierarchy) -->
          <path id="mf1" d="M95,82 L95,106"/>
          <path id="mf2" d="M240,82 L240,106"/>
          <path id="mf3" d="M385,82 L385,106"/>
          <!-- Framework → DV  (44px, the key intercept) -->
          <path id="fd1" d="M95,194 L95,238"/>
          <path id="fd2" d="M240,194 L240,238"/>
          <path id="fd3" d="M385,194 L385,238"/>
          <!-- DV → Driver (32px) -->
          <path id="dd1" d="M95,378 L95,410"/>
          <path id="dd2" d="M240,378 L240,410"/>
          <path id="dd3" d="M385,378 L385,410"/>
          <!-- Driver → Hardware (20px) -->
          <path id="dh1" d="M240,456 L240,476"/>
        </defs>

        <!-- ══ LAYER 0: Models ═══════════════════════════════════════════════ -->
        <rect x="20" y="18" width="440" height="64" rx="6"
          fill="none" stroke="#2a2a2a" stroke-width="1"/>
        <text x="36" y="36" font-family="IBM Plex Mono,monospace" font-size="8"
          fill="#888" letter-spacing="0.18em">MODELS</text>

        <!-- 4 models at cx = 75, 185, 295, 405 -->
        <use href="#ic-meta"      x="65"  y="38" width="20" height="20" fill="#bbb"/>
        <use href="#ic-gemini"    x="175" y="38" width="20" height="20" fill="#bbb"/>
        <use href="#ic-openai"    x="285" y="38" width="20" height="20" fill="#bbb"/>
        <use href="#ic-anthropic" x="395" y="38" width="20" height="20" fill="#bbb"/>

        <text x="75"  y="72" font-family="IBM Plex Mono,monospace" font-size="9" fill="#ccc" text-anchor="middle">LLaMA</text>
        <text x="185" y="72" font-family="IBM Plex Mono,monospace" font-size="9" fill="#ccc" text-anchor="middle">Gemini</text>
        <text x="295" y="72" font-family="IBM Plex Mono,monospace" font-size="9" fill="#ccc" text-anchor="middle">GPT</text>
        <text x="405" y="72" font-family="IBM Plex Mono,monospace" font-size="9" fill="#ccc" text-anchor="middle">Claude</text>

        <!-- Connectors model → framework + animated particles -->
        <line x1="95"  y1="82" x2="95"  y2="106" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="240" y1="82" x2="240" y2="106" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="385" y1="82" x2="385" y2="106" stroke="#2a2a2a" stroke-width="1"/>

        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0s"><mpath href="#mf1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="2" fill="#555" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.35s"><mpath href="#mf1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.35s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.7s"><mpath href="#mf1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.7s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.1s"><mpath href="#mf2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.1s"/></circle>
        <circle r="2" fill="#555" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.45s"><mpath href="#mf2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.45s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.8s"><mpath href="#mf2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.8s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.2s"><mpath href="#mf3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.2s"/></circle>
        <circle r="2" fill="#555" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.55s"><mpath href="#mf3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.55s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.9s"><mpath href="#mf3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.9s"/></circle>

        <!-- ══ LAYER 1: Frameworks ════════════════════════════════════════════ -->
        <rect x="20" y="106" width="440" height="88" rx="6"
          fill="none" stroke="#2a2a2a" stroke-width="1"/>
        <text x="36" y="128" font-family="IBM Plex Mono,monospace" font-size="8"
          fill="#888" letter-spacing="0.18em">FRAMEWORKS</text>

        <!-- Pills aligned to cx=95, 240, 385 matching DV modules exactly -->
        <!-- PyTorch cx=95: x=40, w=110 -->
        <rect x="40"  y="140" width="110" height="28" rx="4" fill="#161616" stroke="#3a3a3a" stroke-width="1"/>
        <use href="#ic-pytorch"    x="50"  y="147" width="14" height="14" style="color:#bbb"/>
        <text x="70"  y="159" font-family="IBM Plex Mono,monospace" font-size="11" fill="#d4d4d4">PyTorch</text>

        <!-- TensorFlow cx=240: x=185, w=110 -->
        <rect x="185" y="140" width="110" height="28" rx="4" fill="#161616" stroke="#3a3a3a" stroke-width="1"/>
        <use href="#ic-tensorflow" x="195" y="147" width="14" height="14" style="color:#bbb"/>
        <text x="215" y="159" font-family="IBM Plex Mono,monospace" font-size="11" fill="#d4d4d4">TensorFlow</text>

        <!-- JAX pill with isometric cube icon -->
        <rect x="330" y="140" width="110" height="28" rx="4" fill="#161616" stroke="#3a3a3a" stroke-width="1"/>
        <use href="#ic-jax" x="344" y="147" width="13" height="13" style="color:#bbb"/>
        <text x="364" y="159" font-family="IBM Plex Mono,monospace" font-size="11" fill="#d4d4d4">JAX</text>

        <!-- ══ Flow: Frameworks → DV  (44px, animated) ═══════════════════════ -->
        <line x1="95"  y1="194" x2="95"  y2="238" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="240" y1="194" x2="240" y2="238" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="385" y1="194" x2="385" y2="238" stroke="#2a2a2a" stroke-width="1"/>

        <!-- 3 staggered particles per path -->
        <circle r="2.5" fill="#aaa" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0s"><mpath href="#fd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="2.5" fill="#888" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.37s"><mpath href="#fd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.37s"/></circle>
        <circle r="2.5" fill="#aaa" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.74s"><mpath href="#fd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.74s"/></circle>
        <circle r="2.5" fill="#aaa" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.1s"><mpath href="#fd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.1s"/></circle>
        <circle r="2.5" fill="#888" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.47s"><mpath href="#fd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.47s"/></circle>
        <circle r="2.5" fill="#aaa" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.84s"><mpath href="#fd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.84s"/></circle>
        <circle r="2.5" fill="#aaa" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.2s"><mpath href="#fd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.2s"/></circle>
        <circle r="2.5" fill="#888" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.57s"><mpath href="#fd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.57s"/></circle>
        <circle r="2.5" fill="#aaa" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.94s"><mpath href="#fd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.94s"/></circle>

        <!-- ══ LAYER 2: Deep Variance Stack (pulsing border) ═════════════════ -->
        <rect x="20" y="238" width="440" height="140" rx="6" fill="#0d0d0d" stroke="#ffffff" stroke-width="1.5">
          <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3.5s"
            repeatCount="indefinite" calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
        </rect>
        <text x="36" y="260" font-family="IBM Plex Mono,monospace" font-size="9"
          fill="#777" letter-spacing="0.14em">DEEP VARIANCE STACK</text>

        <!-- Optimemory (cx=95) -->
        <rect x="34"  y="270" width="122" height="90" rx="5" fill="#141414" stroke="#555555" stroke-width="1"/>
        <use href="#ic-optimemory" x="81"  y="284" width="28" height="28" style="color:#ffffff"/>
        <text x="95"  y="336" font-family="Space Grotesk,sans-serif" font-size="13"
          fill="#ffffff" text-anchor="middle" font-weight="600">Optimemory</text>

        <!-- HyperRAG (cx=240) -->
        <rect x="179" y="270" width="122" height="90" rx="5" fill="#141414" stroke="#555555" stroke-width="1"/>
        <use href="#ic-hyperrag"   x="226" y="284" width="28" height="28" style="color:#ffffff"/>
        <text x="240" y="336" font-family="Space Grotesk,sans-serif" font-size="13"
          fill="#ffffff" text-anchor="middle" font-weight="600">HyperRAG</text>

        <!-- DeepTuner (cx=385) -->
        <rect x="324" y="270" width="122" height="90" rx="5" fill="#141414" stroke="#555555" stroke-width="1"/>
        <use href="#ic-deeptuner"  x="371" y="284" width="28" height="28" style="color:#ffffff"/>
        <text x="385" y="336" font-family="Space Grotesk,sans-serif" font-size="13"
          fill="#ffffff" text-anchor="middle" font-weight="600">DeepTuner</text>

        <!-- ══ Flow: DV → Driver (32px) ═══════════════════════════════════════ -->
        <line x1="95"  y1="378" x2="95"  y2="410" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="240" y1="378" x2="240" y2="410" stroke="#2a2a2a" stroke-width="1"/>
        <line x1="385" y1="378" x2="385" y2="410" stroke="#2a2a2a" stroke-width="1"/>

        <circle r="2" fill="#888" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0s"><mpath href="#dd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.5s"><mpath href="#dd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.5s"/></circle>
        <circle r="2" fill="#888" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.17s"><mpath href="#dd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.17s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.67s"><mpath href="#dd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.67s"/></circle>
        <circle r="2" fill="#888" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.33s"><mpath href="#dd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.33s"/></circle>
        <circle r="2" fill="#666" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.83s"><mpath href="#dd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.83s"/></circle>

        <!-- ══ LAYER 3: GPU Driver ════════════════════════════════════════════ -->
        <rect x="20" y="410" width="440" height="46" rx="6"
          fill="none" stroke="#282828" stroke-width="1"/>
        <!-- chip icon + label vertically centered (layer cy=433) -->
        <use href="#ic-chip" x="178" y="423" width="20" height="20" fill="#888"/>
        <text x="204" y="437" font-family="IBM Plex Mono,monospace" font-size="12"
          fill="#bbb" letter-spacing="0.04em">GPU Driver</text>

        <!-- ══ Flow: Driver → Hardware (20px) ════════════════════════════════ -->
        <line x1="240" y1="456" x2="240" y2="476" stroke="#2a2a2a" stroke-width="1"/>
        <circle r="1.5" fill="#444" class="fp"><animateMotion dur="0.6s" repeatCount="indefinite" begin="0s"><mpath href="#dh1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.6s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="1.5" fill="#444" class="fp"><animateMotion dur="0.6s" repeatCount="indefinite" begin="0.3s"><mpath href="#dh1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.6s" repeatCount="indefinite" begin="0.3s"/></circle>

        <!-- ══ LAYER 4: GPU Hardware (animated active/inactive cluster) ════════ -->
        <rect x="20" y="476" width="440" height="56" rx="6"
          fill="#060606" stroke="#3a3a3a" stroke-width="1"/>

        <!-- 2×4 chip grid — simple opacity fade in/out at varied intervals -->
        <!-- Row 1: y=492, Row 2: y=506 → grid center y=504 matches layer center -->
        <rect x="28" y="492" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.1s" repeatCount="indefinite" begin="0s"/>
        </rect>
        <rect x="46" y="492" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.8s" repeatCount="indefinite" begin="0.7s"/>
        </rect>
        <rect x="64" y="492" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" repeatCount="indefinite" begin="1.3s"/>
        </rect>
        <rect x="82" y="492" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.6s" repeatCount="indefinite" begin="0.3s"/>
        </rect>
        <rect x="28" y="506" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.2s" repeatCount="indefinite" begin="1.9s"/>
        </rect>
        <rect x="46" y="506" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.7s" repeatCount="indefinite" begin="0.9s"/>
        </rect>
        <rect x="64" y="506" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.6s" repeatCount="indefinite" begin="0.5s"/>
        </rect>
        <rect x="82" y="506" width="14" height="10" rx="1.5" fill="#1a2e00" stroke="#76b900" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.9s" repeatCount="indefinite" begin="1.5s"/>
        </rect>

        <!-- Right separator only — ×8 label removed, left separator removed -->
        <line x1="106" y1="484" x2="106" y2="525" stroke="#2a2a2a" stroke-width="0.8"/>

        <!-- NVIDIA icon + GPU names, centered in layer (cy=504) -->
        <use href="#ic-nvidia" x="112" y="493" width="14" height="14" style="color:#888"/>
        <text x="130" y="502" font-family="IBM Plex Mono,monospace" font-size="9" fill="#aaa">H100 · A100</text>
        <text x="112" y="516" font-family="IBM Plex Mono,monospace" font-size="9" fill="#888">AMD MI300X</text>

        <!-- Right separator -->
        <line x1="215" y1="484" x2="215" y2="525" stroke="#2a2a2a" stroke-width="0.8"/>

        <text x="337" y="499" font-family="IBM Plex Mono,monospace" font-size="8"
          fill="#888" text-anchor="middle" letter-spacing="0.06em">NVLink · PCIe · Infinity Fabric</text>
        <text x="337" y="515" font-family="IBM Plex Mono,monospace" font-size="8"
          fill="#666" text-anchor="middle" letter-spacing="0.06em">Single Node · Multi-Node</text>
      </svg>
    </div>
  `,
  styles: [`:host{display:block;width:100%}.stack-viz-wrap{width:100%}`],
})
export class StackVizComponent {}
