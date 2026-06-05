import type { PageHeroImage, PageHeroKpi } from '../components/page-hero';
import type { RailSection } from '../components/section-rail';
import type { StatusVariant } from '../components/status-pill';
import type { ModuleDef } from './modules';

export interface FrameworkTool {
  name: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}

export interface ModulePageConfig {
  slug: ModuleDef['slug'];
  seo: { title: string; description: string };
  statusLabel: string;
  statusVariant: StatusVariant;
  heroImage?: PageHeroImage;
  heroKpis?: PageHeroKpi[];
  rail: RailSection[];
  frameworkTools?: FrameworkTool[];
  showFaqSection?: boolean;
  showBenchmarkTable?: boolean;
}

export const MODULE_PAGE_CONFIG: Record<ModuleDef['slug'], ModulePageConfig> = {
  optimemory: {
    slug: 'optimemory',
    seo: {
      title: 'Optimemory | Deep Variance',
      description:
        "Optimemory reclaims fragmented VRAM your framework can't reach, letting you run larger models and bigger batches on the hardware you already own.",
    },
    statusLabel: 'Optimemory · v1 available',
    statusVariant: 'live',
    heroImage: {
      src: '/optimemory-hero-v2.webp',
      alt: '',
      width: 1536,
      height: 1024,
      desktopBlend: true,
      mobileBlendOpacity: 0.85,
    },
    heroKpis: [{ qualifier: 'up to', value: '65%', label: 'VRAM recovered', highlight: true }],
    rail: [
      { id: 'hero', label: 'Overview' },
      { id: 'problem', label: 'The cost' },
      { id: 'architecture', label: 'How it works' },
      { id: 'workloads', label: 'Workloads' },
      { id: 'code', label: 'Integration' },
      { id: 'compatibility', label: 'Compatibility' },
      { id: 'faqs', label: 'FAQ' },
      { id: 'cta', label: 'Get in touch' },
    ],
    frameworkTools: [
      { name: 'PyTorch', imgSrc: '/pytorch-logo.webp', imgWidth: 324, imgHeight: 80 },
      { name: 'TensorFlow', imgSrc: '/tensorflow-logo.webp', imgWidth: 410, imgHeight: 80 },
      { name: 'vLLM', imgSrc: '/vllm-logo.webp', imgWidth: 280, imgHeight: 80 },
      { name: 'SGLang', imgSrc: '/sglang-logo.webp', imgWidth: 262, imgHeight: 80 },
    ],
    showFaqSection: true,
  },
  hyperrag: {
    slug: 'hyperrag',
    seo: {
      title: 'HyperRAG | Deep Variance',
      description:
        'HyperRAG caches and reuses KV blocks across RAG requests so first-token latency drops without changing your serving stack.',
    },
    statusLabel: 'HyperRAG · Public beta',
    statusVariant: 'beta',
    heroImage: {
      src: '/hyperrag-hero.webp',
      alt: '',
      width: 1536,
      height: 1024,
      desktopBlend: true,
      mobileBlendOpacity: 0.9,
    },
    heroKpis: [
      { value: '94.2%', label: 'Cache hit rate', highlight: true },
      { qualifier: 'up to', value: '6x faster', label: 'first token on cache hits', highlight: true },
    ],
    rail: [
      { id: 'hero', label: 'Overview' },
      { id: 'challenge', label: 'Challenge' },
      { id: 'how-it-works', label: 'How it works' },
      { id: 'system', label: 'System' },
      { id: 'use-cases', label: 'Use cases' },
      { id: 'models', label: 'Models' },
      { id: 'code', label: 'Integration' },
      { id: 'benchmarks', label: 'Benchmarks' },
      { id: 'faqs', label: 'FAQ' },
      { id: 'cta', label: 'Get in touch' },
    ],
    showFaqSection: true,
  },
  deeptuner: {
    slug: 'deeptuner',
    seo: {
      title: 'DeepTuner | Deep Variance',
      description:
        'DeepTuner predicts optimal GPU kernel configurations from intermediate representations—no exhaustive runtime profiling required.',
    },
    statusLabel: 'DeepTuner · Early access · HPC',
    statusVariant: 'preview',
    heroImage: {
      src: '/deeptuner-problem.webp',
      alt: 'GPU cluster showing wasted energy from unoptimized kernel configurations',
      width: 1536,
      height: 1024,
      desktopBlend: true,
      mobileBlendOpacity: 0.85,
    },
    heroKpis: [
      { qualifier: 'Energy saved', value: 'Up to 50%', label: '', highlight: true },
      { qualifier: 'Throughput', value: 'Up to 2x', label: '', highlight: true },
    ],
    rail: [
      { id: 'hero', label: 'Overview' },
      { id: 'problem', label: 'The problem' },
      { id: 'how-it-works', label: 'How it works' },
      { id: 'outcomes', label: 'Outcomes' },
      { id: 'integration', label: 'Integration' },
      { id: 'future', label: 'Roadmap' },
      { id: 'faqs', label: 'FAQ' },
      { id: 'cta', label: 'Get in touch' },
    ],
    showFaqSection: true,
    showBenchmarkTable: true,
  },
};


export function getModulePageConfig(slug: string): ModulePageConfig | undefined {
  return MODULE_PAGE_CONFIG[slug as ModuleDef['slug']];
}
