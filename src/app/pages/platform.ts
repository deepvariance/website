import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ArrowRight,
  Server,
  Database,
  Zap,
  CircleCheck,
  Check,
  RefreshCw,
  type LucideIconData,
} from 'lucide-angular';
import type { ModuleDef } from '../data/modules';
import { StackVizComponent } from '../components/stack-viz';
import { HeroFluidShaderComponent } from '../components/hero-fluid-shader';
import { SeoService } from '../services/seo.service';
import { MODULES } from '../data/modules';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [RouterLink, StackVizComponent, LucideAngularModule, HeroFluidShaderComponent],
  templateUrl: './platform.html',
  styleUrl: './platform.scss',
})
export class PlatformPageComponent {
  readonly ArrowRight = ArrowRight;
  readonly Server = Server;
  readonly Database = Database;
  readonly Zap = Zap;
  readonly CircleCheck = CircleCheck;
  readonly Check = Check;
  readonly RefreshCw = RefreshCw;

  private seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Platform | Deep Variance',
      description: 'How the Deep Variance platform works. Three runtime modules: Optimemory, HyperRAG, DeepTuner. Sits below the framework, above execution.',
      path: '/platform',
    });
  }

  // Three modules — shared with /platform/:slug detail pages
  modules = MODULES;

  moduleIcon(slug: ModuleDef['slug']): LucideIconData {
    const icons: Record<ModuleDef['slug'], LucideIconData> = {
      optimemory: Server,
      hyperrag: Database,
      deeptuner: Zap,
    };
    return icons[slug];
  }

  // Execution lifecycle
  lifecycle = [
    { step: 'Application', detail: 'Your model code issues a forward, generate, or training step.' },
    { step: 'Framework', detail: 'PyTorch, vLLM, SGLang, or TensorRT-LLM dispatches the call.' },
    {
      step: 'Deep Variance intercept',
      detail: 'Memory, KV cache, and kernel calls are rewritten in place. Semantics preserved.',
      chip: 'Intercept layer',
      accent: true,
    },
    { step: 'CUDA dispatch', detail: 'Rewritten calls reach the driver with the original tensor shapes and dtypes.' },
    { step: 'GPU', detail: 'Execution runs on recovered VRAM, warm caches, and tuned kernels.' },
  ];

  whatChanges = [
    'How VRAM is allocated and reclaimed',
    'How KV cache is scheduled and reused',
    'Which kernel config is chosen per shape',
    'Headroom for larger batches and longer context',
  ];

  whatStays = [
    'Your models and weights',
    'Your training and serving pipelines',
    'Your framework version and Python API',
    'Your containers, schedulers, and CI',
  ];

  supportedStack = {
    frameworks: ['PyTorch 2.x', 'vLLM', 'SGLang', 'TensorRT-LLM'],
    gpuVendors: ['NVIDIA (CUDA 11.x, 12.x)', 'AMD (ROCm - DeepTuner roadmap)'],
    hardware: ['H100', 'A100', 'V100', 'MI300X (roadmap)'],
    os: ['Ubuntu 20.04+', 'RHEL 8+', 'CentOS 8+'],
    orchestration: ['Kubernetes', 'Slurm', 'bare-metal'],
    deployment: ['on-premise', 'air-gapped', 'cloud VM'],
  };

  securityPoints = [
    {
      q: 'Does Deep Variance phone home?',
      a: 'No. No telemetry, no external data transfer. All execution stays on your infrastructure.',
    },
    {
      q: 'What permissions does it need?',
      a: 'Standard user permissions for most deployments. Root not required. Runs inside your existing job scheduler.',
    },
    {
      q: 'Can I audit the deployment?',
      a: 'Yes. Full deployment manifest and module source available for security review before onboarding.',
    },
    {
      q: 'What is the rollback process?',
      a: 'Disable the module via config flag. Your workload returns to original execution path immediately. No restart required.',
    },
  ];
}
