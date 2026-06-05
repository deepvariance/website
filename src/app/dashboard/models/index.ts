// ── Domain models for the inference API dashboard ──────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  orgName: string;
  orgId: string;
  avatarInitials: string;
  plan: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export type KeyScope = 'completions' | 'embeddings' | 'admin';
export type KeyStatus = 'active' | 'revoked';

export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  fullKey?: string;
  scopes: KeyScope[];
  status: KeyStatus;
  lastUsedAt: string | null;
  createdAt: string;
  requestCount: number;
  tokenCount: number;
}

export interface CreateKeyRequest {
  name: string;
  scopes: KeyScope[];
}

export interface CreateKeyResponse {
  key: ApiKey;
  fullKey: string;
}

export type UsageMetric = 'requests' | 'tokens' | 'ttft';
export type UsagePeriod = '7d' | '30d' | '90d';

export interface UsagePoint {
  date: string;
  requests: number;
  tokensIn: number;
  tokensOut: number;
  ttftMs: number;
  tpotMs: number;
}

export interface PerModelUsage {
  modelId: string;
  modelName: string;
  requests: number;
  tokensIn: number;
  tokensOut: number;
  avgTtftMs: number;
  costUsd: number;
}

export interface PerKeyUsage {
  keyId: string;
  keyName: string;
  requests: number;
  tokensTotal: number;
  costUsd: number;
}

export interface LatencyPercentiles {
  p50: number;
  p90: number;
  p99: number;
}

export interface UsageSummary {
  period: UsagePeriod;
  points: UsagePoint[];
  byModel: PerModelUsage[];
  byKey: PerKeyUsage[];
  ttftPercentiles: LatencyPercentiles;
  tpotPercentiles: LatencyPercentiles;
  totalTokensIn: number;
  totalTokensOut: number;
}

export type ModelStatus = 'live' | 'beta' | 'preview' | 'soon';
export type Quantization = 'BF16' | 'INT8' | 'INT4 (AWQ)' | 'FP8';

export interface HostedModel {
  id: string;
  name: string;
  family: string;
  params: number;
  status: ModelStatus;
  quantization: Quantization;
  contextWindow: number;
  priceInPer1M: number;
  priceOutPer1M: number;
  cachedInPer1M: number;
  tensorParallel: number;
  gpuType: string;
  latencyP50Ms: number;
  throughputTps: number;
  tags: string[];
  description: string;
}

export type PlanTier = 'starter' | 'pro' | 'enterprise';

export interface BillingCycle {
  periodStart: string;
  periodEnd: string;
  totalUsd: number;
  projectedUsd: number;
  cachedSavingsUsd: number;
  byModel: { modelName: string; usd: number }[];
}

export interface Invoice {
  id: string;
  period: string;
  amountUsd: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl: string;
  issuedAt: string;
}

export interface BillingSummary {
  plan: PlanTier;
  currentCycle: BillingCycle;
  invoices: Invoice[];
  creditUsd: number;
  nextBillingDate: string;
  rpmLimit: number;
  tpmLimit: number;
  rpmUsed: number;
  tpmUsed: number;
}

export type RequestStatus = 'success' | 'error' | 'timeout';

export interface RequestLogEntry {
  id: string;
  modelId: string;
  modelName: string;
  keyId: string;
  keyName: string;
  tokensIn: number;
  tokensOut: number;
  ttftMs: number;
  tpotMs: number;
  totalMs: number;
  status: RequestStatus;
  errorCode?: string;
  prompt?: string;
  completion?: string;
  cachedTokens: number;
  costUsd: number;
  timestamp: string;
}

export interface OverviewStats {
  requestsToday: number;
  requestsChange: number;
  tokensInToday: number;
  tokensOutToday: number;
  avgTtftMs: number;
  ttftChange: number;
  errorRate: number;
  errorRateChange: number;
  spendToday: number;
  spendChange: number;
}

export interface ModelHealth {
  modelId: string;
  modelName: string;
  status: 'online' | 'degraded' | 'offline';
  latencyMs: number;
  errorRate: number;
  replicaCount: number;
}

export interface ActivityEvent {
  id: string;
  type: 'request' | 'key_created' | 'key_revoked' | 'model_status' | 'billing';
  message: string;
  timestamp: string;
  meta?: Record<string, string | number>;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  lastSeenAt: string;
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  secret: string;
  lastDeliveredAt: string | null;
  failureCount: number;
}

export interface OrgSettings {
  orgId: string;
  orgName: string;
  apiBaseUrl: string;
  members: TeamMember[];
  webhooks: Webhook[];
}
