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
      <svg viewBox="0 0 480 466" xmlns="http://www.w3.org/2000/svg"
           class="w-full h-auto dv-stack-viz-max">
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
          <symbol id="ic-pytorch" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 14.022a9.866 9.866 0 0 0 14.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0s-2.904-7.634 0-10.538l4.647-4.646l.582-.665zm3.568 3.899a1.327 1.327 0 0 0-1.327 1.327a1.327 1.327 0 0 0 1.327 1.328A1.327 1.327 0 0 0 16.9 5.226A1.327 1.327 0 0 0 15.573 3.9z"/>
          </symbol>
          <symbol id="ic-tensorflow" viewBox="0 0 24 24">
            <path fill="currentColor" d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564l.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788l-.018-4.618l-3.074-1.756V7.603z"/>
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
          <!-- ── animateMotion flow paths ───────────────────────────────────── -->
          <!-- Models → Frameworks (24px, quieter at top of hierarchy) -->
          <path id="mf1" d="M95,94 L95,106"/>
          <path id="mf2" d="M240,94 L240,106"/>
          <path id="mf3" d="M385,94 L385,106"/>
          <!-- Framework → DV  (44px, the key intercept) -->
          <path id="fd1" d="M95,194 L95,238"/>
          <path id="fd2" d="M240,194 L240,238"/>
          <path id="fd3" d="M385,194 L385,238"/>
          <!-- DV → GPU hardware (32px) -->
          <path id="dh1" d="M95,378 L95,410"/>
          <path id="dh2" d="M240,378 L240,410"/>
          <path id="dh3" d="M385,378 L385,410"/>
        </defs>

        <!-- ══ LAYER 0: Models ═══════════════════════════════════════════════ -->
        <rect x="20" y="18" width="440" height="76" rx="6"
          fill="var(--sv-bg)" stroke="var(--sv-border)" stroke-width="1"/>
        <text x="36" y="34" font-size="8"
          fill="var(--sv-text-dim)" letter-spacing="0.18em">MODELS</text>

        <!-- 4 models at cx = 75, 185, 295, 405 — GPT · LLaMA · Gemini · Qwen -->
        <use href="#ic-openai" x="65"  y="46" width="20" height="20" fill="var(--sv-text-secondary)"/>
        <use href="#ic-meta"   x="175" y="46" width="20" height="20" fill="var(--sv-text-secondary)"/>
        <use href="#ic-gemini" x="285" y="46" width="20" height="20" fill="var(--sv-text-secondary)"/>
        <image
          class="stack-viz__model-logo"
          href="/model-logos/qwen.svg"
          x="395"
          y="46"
          width="20"
          height="20"
          preserveAspectRatio="xMidYMid meet"
        />

        <text x="75"  y="80" font-size="9" fill="var(--sv-text-secondary)" text-anchor="middle">GPT</text>
        <text x="185" y="80" font-size="9" fill="var(--sv-text-secondary)" text-anchor="middle">LLaMA</text>
        <text x="295" y="80" font-size="9" fill="var(--sv-text-secondary)" text-anchor="middle">Gemini</text>
        <text x="405" y="80" font-size="9" fill="var(--sv-text-secondary)" text-anchor="middle">Qwen</text>

        <!-- Connectors model → framework + animated particles -->
        <line x1="95"  y1="94" x2="95"  y2="106" stroke="var(--sv-border)" stroke-width="1"/>
        <line x1="240" y1="94" x2="240" y2="106" stroke="var(--sv-border)" stroke-width="1"/>
        <line x1="385" y1="94" x2="385" y2="106" stroke="var(--sv-border)" stroke-width="1"/>

        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0s"><mpath href="#mf1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="2" fill="var(--sv-flow-alt)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.35s"><mpath href="#mf1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.35s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.7s"><mpath href="#mf1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.7s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.1s"><mpath href="#mf2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.1s"/></circle>
        <circle r="2" fill="var(--sv-flow-alt)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.45s"><mpath href="#mf2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.45s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.8s"><mpath href="#mf2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.8s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.2s"><mpath href="#mf3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.2s"/></circle>
        <circle r="2" fill="var(--sv-flow-alt)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.55s"><mpath href="#mf3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.55s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.9s"><mpath href="#mf3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.9s"/></circle>

        <!-- ══ LAYER 1: Frameworks ════════════════════════════════════════════ -->
        <rect x="20" y="106" width="440" height="88" rx="6"
          fill="var(--sv-bg)" stroke="var(--sv-border)" stroke-width="1"/>
        <text x="36" y="128" font-size="8"
          fill="var(--sv-text-dim)" letter-spacing="0.18em">FRAMEWORKS</text>

        <!-- Pills aligned to cx=95, 240, 385 — cy=166 (nudged below FRAMEWORKS label) -->
        <!-- PyTorch cx=95: x=40, w=110 -->
        <rect x="40"  y="152" width="110" height="28" rx="4" fill="var(--sv-panel)" stroke="var(--sv-border-soft)" stroke-width="1"/>
        <use href="#ic-pytorch"    x="50"  y="159" width="14" height="14" class="stack-viz__icon"/>
        <text x="70"  y="166" dominant-baseline="middle" font-size="11" fill="var(--sv-text-secondary)">PyTorch</text>

        <!-- TensorFlow cx=240: x=185, w=110 -->
        <rect x="185" y="152" width="110" height="28" rx="4" fill="var(--sv-panel)" stroke="var(--sv-border-soft)" stroke-width="1"/>
        <use href="#ic-tensorflow" x="195" y="159" width="14" height="14" class="stack-viz__icon"/>
        <text x="215" y="166" dominant-baseline="middle" font-size="11" fill="var(--sv-text-secondary)">TensorFlow</text>

        <!-- JAX pill with isometric cube icon -->
        <rect x="330" y="152" width="110" height="28" rx="4" fill="var(--sv-panel)" stroke="var(--sv-border-soft)" stroke-width="1"/>
        <use href="#ic-jax" x="344" y="159.5" width="13" height="13" class="stack-viz__icon"/>
        <text x="364" y="166" dominant-baseline="middle" font-size="11" fill="var(--sv-text-secondary)">JAX</text>

        <!-- ══ Flow: Frameworks → DV  (44px, animated) ═══════════════════════ -->
        <line x1="95"  y1="194" x2="95"  y2="238" stroke="var(--sv-border)" stroke-width="1"/>
        <line x1="240" y1="194" x2="240" y2="238" stroke="var(--sv-border)" stroke-width="1"/>
        <line x1="385" y1="194" x2="385" y2="238" stroke="var(--sv-border)" stroke-width="1"/>

        <!-- 3 staggered particles per path -->
        <circle r="2.5" fill="var(--sv-flow)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0s"><mpath href="#fd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="2.5" fill="var(--sv-text-dim)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.37s"><mpath href="#fd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.37s"/></circle>
        <circle r="2.5" fill="var(--sv-flow)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.74s"><mpath href="#fd1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.74s"/></circle>
        <circle r="2.5" fill="var(--sv-flow)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.1s"><mpath href="#fd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.1s"/></circle>
        <circle r="2.5" fill="var(--sv-text-dim)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.47s"><mpath href="#fd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.47s"/></circle>
        <circle r="2.5" fill="var(--sv-flow)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.84s"><mpath href="#fd2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.84s"/></circle>
        <circle r="2.5" fill="var(--sv-flow)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.2s"><mpath href="#fd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.2s"/></circle>
        <circle r="2.5" fill="var(--sv-text-dim)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.57s"><mpath href="#fd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.57s"/></circle>
        <circle r="2.5" fill="var(--sv-flow)" class="fp"><animateMotion dur="1.1s" repeatCount="indefinite" begin="0.94s"><mpath href="#fd3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" repeatCount="indefinite" begin="0.94s"/></circle>

        <!-- ══ LAYER 2: Deep Variance Stack (pulsing border) ═════════════════ -->
        <rect x="20" y="238" width="440" height="140" rx="6" fill="var(--sv-bg)" stroke="var(--sv-text-primary)" stroke-width="1.5">
          <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3.5s"
            repeatCount="indefinite" calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>
        </rect>
        <text x="36" y="260" font-size="9"
          fill="var(--sv-text-muted)" letter-spacing="0.14em">DEEP VARIANCE STACK</text>

        <!-- Optimemory (cx=95) -->
        <rect x="34"  y="270" width="122" height="90" rx="5" fill="var(--sv-panel)" stroke="var(--sv-border-soft)" stroke-width="1"/>
        <use href="#ic-optimemory" x="81"  y="284" width="28" height="28" class="stack-viz__icon stack-viz__icon--light"/>
        <text x="95"  y="336" font-family="Space Grotesk,sans-serif" font-size="13"
          fill="var(--sv-text-primary)" text-anchor="middle" font-weight="600">Optimemory</text>

        <!-- HyperRAG (cx=240) -->
        <rect x="179" y="270" width="122" height="90" rx="5" fill="var(--sv-panel)" stroke="var(--sv-border-soft)" stroke-width="1"/>
        <use href="#ic-hyperrag"   x="226" y="284" width="28" height="28" class="stack-viz__icon stack-viz__icon--light"/>
        <text x="240" y="336" font-family="Space Grotesk,sans-serif" font-size="13"
          fill="var(--sv-text-primary)" text-anchor="middle" font-weight="600">HyperRAG</text>

        <!-- DeepTuner (cx=385) -->
        <rect x="324" y="270" width="122" height="90" rx="5" fill="var(--sv-panel)" stroke="var(--sv-border-soft)" stroke-width="1"/>
        <use href="#ic-deeptuner"  x="371" y="284" width="28" height="28" class="stack-viz__icon stack-viz__icon--light"/>
        <text x="385" y="336" font-family="Space Grotesk,sans-serif" font-size="13"
          fill="var(--sv-text-primary)" text-anchor="middle" font-weight="600">DeepTuner</text>

        <!-- ══ Flow: DV → GPU hardware (32px) ═════════════════════════════════ -->
        <line x1="95"  y1="378" x2="95"  y2="410" stroke="var(--sv-border)" stroke-width="1"/>
        <line x1="240" y1="378" x2="240" y2="410" stroke="var(--sv-border)" stroke-width="1"/>
        <line x1="385" y1="378" x2="385" y2="410" stroke="var(--sv-border)" stroke-width="1"/>

        <circle r="2" fill="var(--sv-text-dim)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0s"><mpath href="#dh1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.5s"><mpath href="#dh1"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.5s"/></circle>
        <circle r="2" fill="var(--sv-text-dim)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.17s"><mpath href="#dh2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.17s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.67s"><mpath href="#dh2"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.67s"/></circle>
        <circle r="2" fill="var(--sv-text-dim)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.33s"><mpath href="#dh3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.33s"/></circle>
        <circle r="2" fill="var(--sv-text-faint)" class="fp"><animateMotion dur="1.0s" repeatCount="indefinite" begin="0.83s"><mpath href="#dh3"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.0s" repeatCount="indefinite" begin="0.83s"/></circle>

        <!-- ══ LAYER 3: GPU Hardware (animated active/inactive cluster) ════════ -->
        <rect x="20" y="410" width="440" height="56" rx="6"
          fill="var(--sv-bg)" stroke="var(--sv-border-soft)" stroke-width="1"/>

        <!-- 2×4 chip grid — inset from layer edge (left column) -->
        <!-- Row 1: y=426, Row 2: y=440 → grid center y=438 matches layer center -->
        <rect x="38" y="426" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.1s" repeatCount="indefinite" begin="0s"/>
        </rect>
        <rect x="56" y="426" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.8s" repeatCount="indefinite" begin="0.7s"/>
        </rect>
        <rect x="74" y="426" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" repeatCount="indefinite" begin="1.3s"/>
        </rect>
        <rect x="92" y="426" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.6s" repeatCount="indefinite" begin="0.3s"/>
        </rect>
        <rect x="38" y="440" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.2s" repeatCount="indefinite" begin="1.9s"/>
        </rect>
        <rect x="56" y="440" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.7s" repeatCount="indefinite" begin="0.9s"/>
        </rect>
        <rect x="74" y="440" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.6s" repeatCount="indefinite" begin="0.5s"/>
        </rect>
        <rect x="92" y="440" width="14" height="10" rx="1.5" fill="var(--sv-vendor-nvidia-dim)" stroke="var(--sv-vendor-nvidia)" stroke-width="0.9">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="1.9s" repeatCount="indefinite" begin="1.5s"/>
        </rect>

        <!-- Column dividers — GPUs | silicon | interconnect -->
        <line x1="126" y1="418" x2="126" y2="459" stroke="var(--sv-border)" stroke-width="0.8"/>
        <line x1="212" y1="418" x2="212" y2="459" stroke="var(--sv-border)" stroke-width="0.8"/>

        <!-- Silicon column (~126–212): official NVIDIA wordmark (layer cy=438) -->
        <image
          class="stack-viz__nvidia-wordmark"
          href="/nvidia-logo.svg"
          x="136"
          y="431.5"
          width="64"
          height="13"
          preserveAspectRatio="xMidYMid meet"
        />

        <!-- Interconnect column (~212–460), vertically centered in layer -->
        <text
          class="stack-viz__interconnect"
          x="336"
          y="438"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="var(--sv-text-dim)"
          letter-spacing="0.06em"
        >PCIe / NVLINK</text>
      </svg>
    </div>
  `,
  styleUrl: './stack-viz.scss',
})
export class StackVizComponent {}
