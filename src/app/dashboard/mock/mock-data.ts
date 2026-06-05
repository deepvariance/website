import {
  ApiKey, HostedModel, UsageSummary, BillingSummary, RequestLogEntry,
  OverviewStats, ModelHealth, ActivityEvent, OrgSettings, CreateKeyResponse,
  UsagePoint,
} from '../models';

const now = new Date('2026-06-01T20:00:00Z');
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000).toISOString();
const fmt = (d: Date) => d.toISOString().split('T')[0];

export const MOCK_MODELS: HostedModel[] = [
  {
    id: 'dv-gemma2-27b-it',
    name: 'DV-Gemma2-27B-IT',
    family: 'Gemma-2',
    params: 27,
    status: 'live',
    quantization: 'INT8',
    contextWindow: 32768,
    priceInPer1M: 0.20,
    priceOutPer1M: 0.70,
    cachedInPer1M: 0.05,
    tensorParallel: 4,
    gpuType: 'A100 80GB',
    latencyP50Ms: 2100,
    throughputTps: 1200,
    tags: ['coding', 'instruction-tuned', 'long-context'],
    description: 'Our flagship 27B coding model, optimized with in-house kernel fusion and prefix caching. Best for agentic coding, repo-context completion, and multi-file refactors.',
  },
  {
    id: 'dv-llama3-8b-it',
    name: 'DV-Llama3-8B-IT',
    family: 'Llama-3',
    params: 8,
    status: 'live',
    quantization: 'INT8',
    contextWindow: 16384,
    priceInPer1M: 0.05,
    priceOutPer1M: 0.15,
    cachedInPer1M: 0.01,
    tensorParallel: 1,
    gpuType: 'A100 40GB',
    latencyP50Ms: 380,
    throughputTps: 4800,
    tags: ['fast', 'general', 'low-latency'],
    description: 'Fast general-purpose 8B for interactive completions and high-concurrency workloads.',
  },
  {
    id: 'dv-qwen2-72b-it',
    name: 'DV-Qwen2-72B-IT',
    family: 'Qwen-2',
    params: 72,
    status: 'beta',
    quantization: 'INT4 (AWQ)',
    contextWindow: 65536,
    priceInPer1M: 0.45,
    priceOutPer1M: 1.20,
    cachedInPer1M: 0.10,
    tensorParallel: 4,
    gpuType: 'A100 80GB',
    latencyP50Ms: 3800,
    throughputTps: 620,
    tags: ['multilingual', 'long-context', 'reasoning'],
    description: '72B with 64K context, INT4 AWQ quantization, ideal for complex reasoning and multilingual tasks.',
  },
  {
    id: 'dv-deepseek-coder-7b',
    name: 'DV-DeepSeek-Coder-7B',
    family: 'DeepSeek-Coder',
    params: 7,
    status: 'live',
    quantization: 'INT8',
    contextWindow: 16384,
    priceInPer1M: 0.04,
    priceOutPer1M: 0.12,
    cachedInPer1M: 0.01,
    tensorParallel: 1,
    gpuType: 'A100 40GB',
    latencyP50Ms: 290,
    throughputTps: 6100,
    tags: ['coding', 'fast', 'fill-in-middle'],
    description: 'Specialized 7B coding model with fill-in-middle (FIM) support. Lowest latency for real-time IDE integrations.',
  },
  {
    id: 'dv-mistral-nemo-12b',
    name: 'DV-Mistral-Nemo-12B',
    family: 'Mistral',
    params: 12,
    status: 'preview',
    quantization: 'BF16',
    contextWindow: 131072,
    priceInPer1M: 0.12,
    priceOutPer1M: 0.35,
    cachedInPer1M: 0.03,
    tensorParallel: 2,
    gpuType: 'A100 80GB',
    latencyP50Ms: 1100,
    throughputTps: 2400,
    tags: ['ultra-long-context', 'preview', 'instruction-tuned'],
    description: 'Preview: 128K context 12B model. Available for pilot customers.',
  },
];

export const MOCK_KEYS: ApiKey[] = [
  { id: 'key_01', name: 'Production', maskedKey: 'dv-sk-\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u20223f9a', scopes: ['completions', 'embeddings'], status: 'active', lastUsedAt: minutesAgo(4), createdAt: daysAgo(47), requestCount: 184220, tokenCount: 4821000 },
  { id: 'key_02', name: 'CI / Testing', maskedKey: 'dv-sk-\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u20227b2c', scopes: ['completions'], status: 'active', lastUsedAt: hoursAgo(2), createdAt: daysAgo(30), requestCount: 12840, tokenCount: 320400 },
  { id: 'key_03', name: 'Playground (personal)', maskedKey: 'dv-sk-\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022a1d4', scopes: ['completions', 'embeddings', 'admin'], status: 'active', lastUsedAt: daysAgo(1), createdAt: daysAgo(14), requestCount: 1204, tokenCount: 38900 },
  { id: 'key_04', name: 'Legacy v1 client', maskedKey: 'dv-sk-\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022cc10', scopes: ['completions'], status: 'revoked', lastUsedAt: daysAgo(12), createdAt: daysAgo(90), requestCount: 55000, tokenCount: 1200000 },
];

function makeUsagePoint(daysBack: number): UsagePoint {
  const base = 4200 + Math.round(Math.sin(daysBack * 1.2) * 800);
  return {
    date: fmt(new Date(now.getTime() - daysBack * 86400000)),
    requests: base + Math.round(Math.random() * 200),
    tokensIn: (base * 24000) / 540,
    tokensOut: (base * 8000) / 540,
    ttftMs: 2100 + Math.round(Math.sin(daysBack * 0.8) * 200),
    tpotMs: 12 + Math.round(Math.random() * 3),
  };
}

export const MOCK_USAGE: UsageSummary = {
  period: '7d',
  points: [6, 5, 4, 3, 2, 1, 0].map(makeUsagePoint),
  byModel: [
    { modelId: 'dv-gemma2-27b-it', modelName: 'DV-Gemma2-27B-IT', requests: 22480, tokensIn: 998000000, tokensOut: 332000000, avgTtftMs: 2100, costUsd: 431.40 },
    { modelId: 'dv-llama3-8b-it', modelName: 'DV-Llama3-8B-IT', requests: 8200, tokensIn: 82000000, tokensOut: 27000000, avgTtftMs: 380, costUsd: 8.15 },
    { modelId: 'dv-deepseek-coder-7b', modelName: 'DV-DeepSeek-Coder-7B', requests: 5100, tokensIn: 44000000, tokensOut: 15000000, avgTtftMs: 290, costUsd: 3.56 },
    { modelId: 'dv-qwen2-72b-it', modelName: 'DV-Qwen2-72B-IT', requests: 340, tokensIn: 18000000, tokensOut: 6000000, avgTtftMs: 3800, costUsd: 15.30 },
  ],
  byKey: [
    { keyId: 'key_01', keyName: 'Production', requests: 28960, tokensTotal: 1420000000, costUsd: 432.10 },
    { keyId: 'key_02', keyName: 'CI / Testing', requests: 6200, tokensTotal: 80000000, costUsd: 12.40 },
    { keyId: 'key_03', keyName: 'Playground (personal)', requests: 960, tokensTotal: 8200000, costUsd: 13.90 },
  ],
  ttftPercentiles: { p50: 2100, p90: 3400, p99: 5200 },
  tpotPercentiles: { p50: 12, p90: 18, p99: 28 },
  totalTokensIn: 1142000000,
  totalTokensOut: 380000000,
};

export const MOCK_BILLING: BillingSummary = {
  plan: 'pro',
  currentCycle: {
    periodStart: '2026-06-01',
    periodEnd: '2026-06-30',
    totalUsd: 458.41,
    projectedUsd: 520.00,
    cachedSavingsUsd: 84.20,
    byModel: [
      { modelName: 'DV-Gemma2-27B-IT', usd: 431.40 },
      { modelName: 'DV-Qwen2-72B-IT', usd: 15.30 },
      { modelName: 'DV-Llama3-8B-IT', usd: 8.15 },
      { modelName: 'DV-DeepSeek-Coder-7B', usd: 3.56 },
    ],
  },
  invoices: [
    { id: 'inv_may26', period: 'May 2026', amountUsd: 394.12, status: 'paid', pdfUrl: '#', issuedAt: '2026-05-01' },
    { id: 'inv_apr26', period: 'April 2026', amountUsd: 312.84, status: 'paid', pdfUrl: '#', issuedAt: '2026-04-01' },
    { id: 'inv_mar26', period: 'March 2026', amountUsd: 187.50, status: 'paid', pdfUrl: '#', issuedAt: '2026-03-01' },
    { id: 'inv_feb26', period: 'February 2026', amountUsd: 95.00, status: 'paid', pdfUrl: '#', issuedAt: '2026-02-01' },
  ],
  creditUsd: 25.00,
  nextBillingDate: '2026-07-01',
  rpmLimit: 500,
  tpmLimit: 200000,
  rpmUsed: 184,
  tpmUsed: 82400,
};

const LOG_MODELS = [
  { id: 'dv-gemma2-27b-it', name: 'DV-Gemma2-27B-IT' },
  { id: 'dv-llama3-8b-it', name: 'DV-Llama3-8B-IT' },
  { id: 'dv-deepseek-coder-7b', name: 'DV-DeepSeek-Coder-7B' },
];
const LOG_KEYS = [
  { id: 'key_01', name: 'Production' },
  { id: 'key_02', name: 'CI / Testing' },
];
const STATUSES: ('success' | 'error' | 'timeout')[] = ['success', 'success', 'success', 'success', 'success', 'error', 'timeout'];

function makeLog(i: number): RequestLogEntry {
  const m = LOG_MODELS[i % LOG_MODELS.length];
  const k = LOG_KEYS[i % 2];
  const status = STATUSES[i % STATUSES.length];
  const tokIn = 20000 + (i * 1337) % 8000;
  const tokOut = 4000 + (i * 421) % 4000;
  const ttft = m.id === 'dv-gemma2-27b-it' ? 2100 + (i * 113) % 800 : 380 + (i * 47) % 200;
  return {
    id: `req_${String(i).padStart(6, '0')}`,
    modelId: m.id,
    modelName: m.name,
    keyId: k.id,
    keyName: k.name,
    tokensIn: tokIn,
    tokensOut: status === 'success' ? tokOut : 0,
    ttftMs: status === 'success' ? ttft : 0,
    tpotMs: status === 'success' ? 12 + (i * 3) % 8 : 0,
    totalMs: status === 'success' ? ttft + tokOut * 13 : 8000,
    status,
    errorCode: status === 'error' ? 'context_length_exceeded' : undefined,
    prompt: 'Refactor the following function to use async/await...',
    completion: status === 'success' ? 'async function processData(items) { ...' : undefined,
    cachedTokens: Math.floor(tokIn * 0.6),
    costUsd: (tokIn * 0.20 + tokOut * 0.70) / 1000000,
    timestamp: minutesAgo(i * 3 + 1),
  };
}

export const MOCK_LOGS: RequestLogEntry[] = Array.from({ length: 80 }, (_, i) => makeLog(i));

export const MOCK_OVERVIEW_STATS: OverviewStats = {
  requestsToday: 4820,
  requestsChange: 12.4,
  tokensInToday: 113280000,
  tokensOutToday: 37760000,
  avgTtftMs: 2140,
  ttftChange: -8.2,
  errorRate: 0.42,
  errorRateChange: -0.1,
  spendToday: 48.72,
  spendChange: 15.6,
};

export const MOCK_MODEL_HEALTH: ModelHealth[] = [
  { modelId: 'dv-gemma2-27b-it', modelName: 'DV-Gemma2-27B-IT', status: 'online', latencyMs: 2140, errorRate: 0.12, replicaCount: 2 },
  { modelId: 'dv-llama3-8b-it', modelName: 'DV-Llama3-8B-IT', status: 'online', latencyMs: 384, errorRate: 0.08, replicaCount: 1 },
  { modelId: 'dv-deepseek-coder-7b', modelName: 'DV-DeepSeek-Coder-7B', status: 'online', latencyMs: 293, errorRate: 0.21, replicaCount: 1 },
  { modelId: 'dv-qwen2-72b-it', modelName: 'DV-Qwen2-72B-IT', status: 'degraded', latencyMs: 5100, errorRate: 1.8, replicaCount: 1 },
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'a1', type: 'request', message: 'Peak request rate: 212 req/min', timestamp: minutesAgo(8) },
  { id: 'a2', type: 'model_status', message: 'DV-Qwen2-72B-IT entered degraded state', timestamp: minutesAgo(22) },
  { id: 'a3', type: 'billing', message: 'Daily spend reached $40.00 (82% of alert threshold)', timestamp: hoursAgo(2) },
  { id: 'a4', type: 'key_created', message: 'New API key "Playground (personal)" created', timestamp: daysAgo(1) },
  { id: 'a5', type: 'request', message: '10,000 cached prefix hits saved $8.42 in compute', timestamp: daysAgo(1) },
  { id: 'a6', type: 'model_status', message: 'DV-Mistral-Nemo-12B now available in preview', timestamp: daysAgo(2) },
  { id: 'a7', type: 'key_revoked', message: 'API key "Legacy v1 client" revoked', timestamp: daysAgo(12) },
];

export const MOCK_ORG: OrgSettings = {
  orgId: 'org_deepvariance',
  orgName: 'Deep Variance',
  apiBaseUrl: 'https://api.deepvariance.com/v1',
  members: [
    { id: 'm1', email: 'saai@deepvariance.com', name: 'Saai Vignesh', role: 'owner', joinedAt: daysAgo(90), lastSeenAt: minutesAgo(5) },
    { id: 'm2', email: 'alex@deepvariance.com', name: 'Alex R.', role: 'admin', joinedAt: daysAgo(60), lastSeenAt: hoursAgo(3) },
    { id: 'm3', email: 'priya@deepvariance.com', name: 'Priya K.', role: 'member', joinedAt: daysAgo(30), lastSeenAt: daysAgo(1) },
  ],
  webhooks: [
    { id: 'wh_01', url: 'https://hooks.zapier.com/hooks/catch/abc123/', events: ['billing.alert', 'key.revoked'], status: 'active', secret: 'whs_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u20221a2b', lastDeliveredAt: hoursAgo(2), failureCount: 0 },
    { id: 'wh_02', url: 'https://example.com/dv-webhook', events: ['model.status_changed'], status: 'inactive', secret: 'whs_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u20228f3d', lastDeliveredAt: null, failureCount: 3 },
  ],
};

export function mockCreateKey(req: import('../models').CreateKeyRequest): CreateKeyResponse {
  const raw = `dv-sk-${Math.random().toString(36).slice(2, 18)}`;
  const key: ApiKey = {
    id: `key_${Date.now()}`,
    name: req.name,
    maskedKey: `dv-sk-\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022${raw.slice(-4)}`,
    scopes: req.scopes,
    status: 'active',
    lastUsedAt: null,
    createdAt: new Date().toISOString(),
    requestCount: 0,
    tokenCount: 0,
  };
  return { key, fullKey: raw };
}
