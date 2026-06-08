import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-hero-fluid-shader',
  standalone: true,
  template: `<canvas #canvas class="hero-fluid-shader__canvas" aria-hidden="true"></canvas>`,
  styleUrl: './hero-fluid-shader.scss',
})
export class HeroFluidShaderComponent implements AfterViewInit, OnDestroy {
  /** Required when copying frames for CSS glass blur over the canvas */
  @Input() preserveDrawingBuffer = false;

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);

  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private timeOrigin = 0;
  private rafId = 0;
  private resizeRafId = 0;
  private renderRafId = 0;
  private running = false;
  private reducedMotion = false;
  private finePointer = false;

  // Cursor torch: target = raw pointer, current = eased follow; torch = enter/leave fade.
  private mouseTargetX = -1;
  private mouseTargetY = -1;
  private mouseX = -1;
  private mouseY = -1;
  private torchTarget = 0;
  private torch = 0;

  private uTime: WebGLUniformLocation | null = null;
  private uResolution: WebGLUniformLocation | null = null;
  private uCellPx: WebGLUniformLocation | null = null;
  private uMouse: WebGLUniformLocation | null = null;
  private uTorch: WebGLUniformLocation | null = null;

  /** Device-px cell size — anchored to viewport, not canvas height, so density is universal. */
  private cellPx = 32;
  private static readonly CELLS_ACROSS_VIEWPORT = 30;

  private readonly boundResize = () => this.scheduleResize();
  private readonly boundVisibility = () => this.onVisibilityChange();
  private readonly boundPointerMove = (e: PointerEvent) => this.onPointerMove(e);
  private readonly boundPointerLeave = () => this.onPointerLeave();

  getCanvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.finePointer = window.matchMedia('(pointer: fine)').matches;

    const canvas = this.canvasRef.nativeElement;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: this.preserveDrawingBuffer,
    });
    if (!gl) {
      return;
    }

    this.gl = gl;
    if (!this.setupProgram(gl)) {
      return;
    }

    this.scheduleResize();
    window.addEventListener('resize', this.boundResize, { passive: true });
    document.addEventListener('visibilitychange', this.boundVisibility);

    // Cursor torch — only on fine pointers (skip touch). Tracked on window so it keeps
    // working while hovering over the headline/buttons that sit above the canvas.
    if (this.finePointer) {
      window.addEventListener('pointermove', this.boundPointerMove, { passive: true });
      window.addEventListener('pointerleave', this.boundPointerLeave, { passive: true });
    }

    if (this.reducedMotion) {
      this.draw(0);
      return;
    }

    this.start();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.stop();
    cancelAnimationFrame(this.resizeRafId);
    cancelAnimationFrame(this.renderRafId);

    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.boundVisibility);
    window.removeEventListener('pointermove', this.boundPointerMove);
    window.removeEventListener('pointerleave', this.boundPointerLeave);

    if (this.gl) {
      if (this.positionBuffer) {
        this.gl.deleteBuffer(this.positionBuffer);
      }
      if (this.program) {
        this.gl.deleteProgram(this.program);
      }
    }
  }

  private onVisibilityChange(): void {
    if (this.reducedMotion) {
      return;
    }
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  }

  private onPointerMove(e: PointerEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    const inside = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;

    if (!inside) {
      this.torchTarget = 0;
      return;
    }

    // Drawing-buffer pixels; flip Y because gl_FragCoord's origin is bottom-left.
    this.mouseTargetX = nx * canvas.width;
    this.mouseTargetY = (1 - ny) * canvas.height;
    this.torchTarget = 1;

    // Seed the eased position on first contact so the torch doesn't streak from a corner.
    if (this.mouseX < 0) {
      this.mouseX = this.mouseTargetX;
      this.mouseY = this.mouseTargetY;
    }

    if (this.reducedMotion) {
      this.mouseX = this.mouseTargetX;
      this.mouseY = this.mouseTargetY;
      this.torch = 1;
      this.scheduleRender();
    }
  }

  private onPointerLeave(): void {
    this.torchTarget = 0;
    if (this.reducedMotion) {
      this.torch = 0;
      this.scheduleRender();
    }
  }

  // Advance the eased torch state one frame. Returns true while still settling.
  private updateTorch(): void {
    if (this.mouseX < 0) {
      this.mouseX = this.mouseTargetX;
      this.mouseY = this.mouseTargetY;
    }
    // Snappy follow — light trailing without the old ~400ms lag at 0.12.
    this.mouseX += (this.mouseTargetX - this.mouseX) * 0.38;
    this.mouseY += (this.mouseTargetY - this.mouseY) * 0.38;
    this.torch += (this.torchTarget - this.torch) * 0.18;
  }

  // One-off render (reduced-motion / resize) without spinning the rAF loop.
  private scheduleRender(): void {
    if (this.running) {
      return;
    }
    cancelAnimationFrame(this.renderRafId);
    this.renderRafId = requestAnimationFrame(() => this.draw(0));
  }

  private scheduleResize(): void {
    cancelAnimationFrame(this.resizeRafId);
    this.resizeRafId = requestAnimationFrame(() => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const gl = this.gl;
    if (!gl) {
      return;
    }

    const rect = this.host.nativeElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    const canvas = this.canvasRef.nativeElement;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    this.updateCellPx(dpr);

    if (!this.running) {
      this.draw(0);
    }
  }

  private updateCellPx(dpr: number): void {
    // Same ~30px CSS cell size on every page regardless of hero section height.
    this.cellPx = (window.innerHeight * dpr) / HeroFluidShaderComponent.CELLS_ACROSS_VIEWPORT;
  }

  private start(): void {
    if (this.running || !this.gl) {
      return;
    }

    this.running = true;
    this.timeOrigin = 0;

    const tick = (now: number) => {
      if (!this.running) {
        return;
      }

      if (!this.timeOrigin) {
        this.timeOrigin = now;
      }

      this.updateTorch();
      this.draw((now - this.timeOrigin) / 1000);
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private draw(timeSeconds: number): void {
    const gl = this.gl;
    if (!gl || !this.program) {
      return;
    }

    gl.useProgram(this.program);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.updateCellPx(dpr);

    // Wrap time to keep float magnitude small (avoids fract() precision drift in long sessions).
    gl.uniform1f(this.uTime, timeSeconds % 3600);
    gl.uniform2f(this.uResolution, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform1f(this.uCellPx, this.cellPx);
    gl.uniform2f(this.uMouse, this.mouseX, this.mouseY);
    gl.uniform1f(this.uTorch, this.torch);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  private setupProgram(gl: WebGLRenderingContext): boolean {
    const vertexSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_cellPx; // device-px per cell (viewport-anchored, set from TS)
      uniform vec2 u_mouse;   // cursor in drawing-buffer px (origin bottom-left)
      uniform float u_torch;  // 0..1 enter/leave fade

      // ── Tunables ───────────────────────────────────────────────────────────
      const float TORCH_CELLS  = 4.5;    // torch radius in grid cells (medium)
      const vec3  TORCH_COLOR  = vec3(0.85, 0.90, 1.0); // cool neutral white
      const float LINE_W       = 1.25;   // grid line width in device px
      const float HEAD_CORE_K  = 130.0;  // sharp head falloff (higher = sharper point)
      const float HEAD_GLOW_K  = 26.0;   // soft head halo falloff (trailing)
      const float TAIL_LEN     = 0.085;  // exponential tail decay length (faded end)
      const float MARGIN        = 0.12;  // edge fade-in/out (hides the wrap seam)
      const float ACTIVE_FRAC  = 0.24;   // fraction of wires carrying an impulse

      float h11(float n) {
        return fract(sin(n * 12.9898) * 43758.5453);
      }

      // Higher-quality 1D hash (Dave Hoskins) — far more uniform than fract(sin()),
      // so palette indices are evenly distributed across the few active wires.
      float hash11(float p) {
        p = fract(p * 0.1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
      }

      // 7-color palette. Each wire picks one on spawn (static per wire). The head stays
      // white-hot at its core; this color shows in the glow halo and trailing tail.
      vec3 pulseColor(float idx) {
        if (idx < 1.0) return vec3(0.929, 0.110, 0.141); // AMD red        (#ED1C24)
        if (idx < 2.0) return vec3(0.462, 0.725, 0.000); // NVIDIA green   (#76B900)
        if (idx < 3.0) return vec3(0.000, 0.443, 0.773); // Intel blue     (#0071C5)
        if (idx < 4.0) return vec3(0.945, 0.353, 0.161); // Cerebras orange(#F15A29)
        if (idx < 5.0) return vec3(0.482, 0.380, 1.000); // Deep Variance purple (#7B61FF)
        if (idx < 6.0) return vec3(0.960, 0.965, 1.000); // Deep Variance white
        return vec3(0.133, 0.827, 0.933);                // cyan (distinct)(#22D3EE)
      }

      // Comet on one wire. s = fragment position along the wire (0..1 across viewport).
      // Returns vec4(coreEnergy, glowEnergy, tailEnergy, colorId).
      vec4 wireComet(float s, float id, float t) {
        float gate = step(1.0 - ACTIVE_FRAC, h11(id * 1.37 + 0.123));
        if (gate < 0.5) {
          return vec4(0.0);
        }

        float dir   = h11(id * 2.11 + 7.7) > 0.5 ? 1.0 : -1.0;
        float phase = h11(id * 3.17 + 3.3);
        float speed = mix(0.035, 0.11, h11(id * 4.23 + 9.1)); // varied: ~9-28s per traversal
        float colorId = floor(hash11(id + 41.7) * 7.0); // 0..6, evenly distributed

        // dir must drive the HEAD's actual motion (not just the tail side), otherwise
        // "reverse" wires keep their head drifting forward with the tail leading.
        float head = fract(dir * t * speed + phase);

        // Signed "behind the head" coordinate: b = 0 exactly at the head, grows as you
        // move BEHIND it along travel, and is ~1 just AHEAD of it. Everything is keyed off
        // b only (never min(b, 1-b)), so the leading edge is sharp (nothing renders ahead)
        // and the whole comet fades strictly behind -> one sharp end, one faded end.
        float b = fract(dir * (head - s));

        float core = exp(-pow(b * HEAD_CORE_K, 2.0)); // sharp bright head point
        float glow = exp(-pow(b * HEAD_GLOW_K, 2.0)); // soft halo, trailing only
        float tail = exp(-b / TAIL_LEN) * smoothstep(0.92, 0.45, b);

        // Fade the whole comet near both edges so the wrap seam is invisible (no pop).
        float edge = smoothstep(0.0, MARGIN, head) * (1.0 - smoothstep(1.0 - MARGIN, 1.0, head));

        return vec4(core * edge, glow * edge, tail * edge, colorId);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / max(u_resolution.xy, vec2(1.0));

        // One shared square lattice: both grid lines and comet wires use these numbers.
        float cellPx = u_cellPx;
        vec2 cell    = gl_FragCoord.xy / cellPx;
        vec2 cellId  = floor(cell + 0.5);
        vec2 dCell   = abs(cell - cellId);

        // Crisp, AA, resolution-correct line masks (distance measured in device px).
        // Core mask = the thin track. Glow mask = wider bloom so the comet head glows
        // perpendicular to the wire (reads as a comet rather than a 1px dot).
        float halfW = LINE_W * 0.5;
        float glowW = LINE_W * 2.2;
        float vCore = 1.0 - smoothstep(halfW - 0.6, halfW + 0.6, dCell.x * cellPx); // vertical lines
        float hCore = 1.0 - smoothstep(halfW - 0.6, halfW + 0.6, dCell.y * cellPx); // horizontal lines
        float vGlow = 1.0 - smoothstep(0.0, glowW, dCell.x * cellPx);
        float hGlow = 1.0 - smoothstep(0.0, glowW, dCell.y * cellPx);
        float gridMask = max(vCore, hCore);

        // Comets: horizontal wires travel in x (confined to their horizontal line);
        // vertical wires travel in y (confined to their vertical line).
        vec4 hC = wireComet(uv.x, cellId.y, u_time);
        vec4 vC = wireComet(uv.y, cellId.x, u_time);

        // core + tail ride the thin track; the soft halo blooms on the wider mask.
        float hHead = hC.x * hCore + hC.y * hGlow;
        float vHead = vC.x * vCore + vC.y * vGlow;
        float hTail = hC.z * hCore;
        float vTail = vC.z * vCore;

        // Per-wire palette color (chosen on spawn) drives the halo + tail.
        vec3 hCol = pulseColor(hC.w);
        vec3 vCol = pulseColor(vC.w);

        // Grid stays visible everywhere (incl. behind the text — it's dim enough).
        // Only the bright impulses are eased back in the centered text band for legibility.
        float calm = smoothstep(0.14, 0.46, abs(uv.y - 0.5));
        float gridFactor = mix(0.85, 1.0, calm);
        float fxFactor   = mix(0.4, 1.0, calm);

        // Cursor torch: a soft pool of light positioned at the pointer, sitting BEHIND the
        // grid so it backlights the lattice. Smooth radial falloff, eased back behind text.
        float torchPx   = TORCH_CELLS * cellPx;
        float torchDist = distance(gl_FragCoord.xy, u_mouse);
        float torchFall = smoothstep(torchPx, 0.0, torchDist);
        torchFall = pow(torchFall, 1.4) * u_torch * mix(0.55, 1.0, calm); // center-weighted
        float cometBoost = 1.0 + torchFall * 1.6; // comets passing through glow brighter

        // Neutral base grid (dim but clearly present).
        vec3 lit = vec3(gridMask * 0.34 * gridFactor);

        // Torch sits behind the grid: a soft ambient pool of light plus a stronger
        // backlight on the lattice lines it passes behind.
        lit += TORCH_COLOR * torchFall * 0.16;                 // ambient pool
        lit += TORCH_COLOR * gridMask * torchFall * 1.25;      // backlit grid lines

        // Saturated colored head (the head core is drawn in the wire's brand color),
        // plus colored halo + tail.
        lit += hCol * (hHead * 3.2 + hTail * 1.0) * fxFactor * cometBoost;
        lit += vCol * (vHead * 3.2 + vTail * 1.0) * fxFactor * cometBoost;

        // Tiny white-hot pinpoint at the very centre of each head only (pow() keeps it
        // tight), so the head still glows hot without washing out the brand color.
        // Confined to the thin track, else it bleeds across the cell into a bar.
        float whiteTip = pow(hC.x * hCore, 5.0) + pow(vC.x * vCore, 5.0);
        lit += vec3(1.0, 0.92, 0.8) * whiteTip * 2.1 * fxFactor; // warm, softer flash

        // Reinhard tone map keeps bright intersections from clipping to white over dark text.
        lit = lit / (1.0 + lit);

        // Alpha decoupled from luma (avoids double-darkening dim grid pixels).
        // Bright heads get a higher alpha ceiling so they read as glowing hotspots.
        float a = clamp(max(max(lit.r, lit.g), lit.b) * 1.6, 0.0, 0.97);
        gl_FragColor = vec4(lit * a, a); // premultiplied alpha
      }
    `;

    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      return false;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return false;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('HeroFluidShader: program link failed', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return false;
    }

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();
    if (positionLocation < 0 || !buffer) {
      gl.deleteProgram(program);
      return false;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0, 0, 0, 0);

    this.program = program;
    this.positionBuffer = buffer;
    this.uTime = gl.getUniformLocation(program, 'u_time');
    this.uResolution = gl.getUniformLocation(program, 'u_resolution');
    this.uCellPx = gl.getUniformLocation(program, 'u_cellPx');
    this.uMouse = gl.getUniformLocation(program, 'u_mouse');
    this.uTorch = gl.getUniformLocation(program, 'u_torch');

    return !!(this.uTime && this.uResolution && this.uCellPx);
  }

  private createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string,
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    }

    console.warn('HeroFluidShader: shader compile failed', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
}
