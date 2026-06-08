import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
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
  private running = false;
  private reducedMotion = false;

  private uTime: WebGLUniformLocation | null = null;
  private uResolution: WebGLUniformLocation | null = null;

  private readonly boundResize = () => this.scheduleResize();
  private readonly boundVisibility = () => this.onVisibilityChange();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = this.canvasRef.nativeElement;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
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

    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.boundVisibility);

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

    if (!this.running) {
      this.draw(0);
    }
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
    gl.uniform1f(this.uTime, timeSeconds);
    gl.uniform2f(this.uResolution, gl.drawingBufferWidth, gl.drawingBufferHeight);
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

      float hash(vec2 p) {
        p = fract(p * vec2(127.1, 311.7));
        p += dot(p, p + 34.35);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      mat2 rot(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.55;
        for (int i = 0; i < 6; i++) {
          value += amp * noise(p);
          p = rot(0.72) * p * 1.88 + vec2(0.06, -0.04);
          amp *= 0.53;
        }
        return value;
      }

      vec2 flowField(vec2 p, float t) {
        float n1 = fbm(p * 1.35 + vec2(0.0, t * 0.17));
        float n2 = fbm(p * 1.35 + vec2(4.6, -t * 0.15));
        return vec2(n1, n2) - 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / max(u_resolution.xy, vec2(1.0));
        float aspect = u_resolution.x / max(u_resolution.y, 1.0);
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.28;

        float t = u_time * 0.46;
        vec2 drift = vec2(sin(t * 0.41), cos(t * 0.37)) * 0.32;
        float epoch = floor(t * 0.22);
        float epochMix = smoothstep(0.0, 1.0, fract(t * 0.22));
        vec2 jumpA = vec2(hash(vec2(epoch, 1.31)), hash(vec2(epoch, 7.73)));
        vec2 jumpB = vec2(hash(vec2(epoch + 1.0, 1.31)), hash(vec2(epoch + 1.0, 7.73)));
        vec2 jump = mix(jumpA, jumpB, epochMix) - 0.5;

        vec2 v1 = flowField(p + drift * 0.35, t);
        vec2 v2 = flowField(p * 1.7 - v1 * 1.15 - drift * 0.28, t * 1.2);
        vec2 q = p + v1 * 1.2 + v2 * 0.75 + jump * vec2(1.1, 0.85);

        float base = fbm(q * 1.5 + vec2(t * 0.07, -t * 0.05));
        float wisps = fbm(q * 3.1 - vec2(t * 0.13, t * 0.09));
        float filaments = fbm(q * 6.2 + v2 * 1.4 + vec2(t * 0.05, t * 0.03));

        float liquid = smoothstep(0.42, 0.88, base + wisps * 0.4);
        liquid += smoothstep(0.72, 0.97, filaments) * 0.16;

        // Activity map sweeps whole frame, creating random "come and go" regions.
        float activityA = fbm(uv * vec2(4.0, 3.0) + vec2(t * 0.21, -t * 0.17) + jump * 0.65);
        float activityB = fbm((1.0 - uv.yx) * vec2(3.6, 3.4) + vec2(-t * 0.16, t * 0.19) - jump * 0.55);
        float activity = smoothstep(0.34, 0.8, activityA * 0.52 + activityB * 0.48);
        float pop = smoothstep(
          0.62,
          0.97,
          fbm(uv * vec2(9.0, 5.1) + vec2(t * 0.33, -t * 0.28) + jump * 1.2)
        );

        float grain = (hash(gl_FragCoord.xy + u_time * 29.0) - 0.5) * 0.05;
        float luma = clamp(liquid * mix(0.35, 0.96, activity) + pop * 0.1 + grain * 0.12, 0.0, 1.0);
        vec3 color = vec3(pow(luma, 1.8));
        float alpha = clamp(luma * 0.54, 0.0, 0.56);
        gl_FragColor = vec4(color, alpha);
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

    return !!(this.uTime && this.uResolution);
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
