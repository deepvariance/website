import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

import {
  OverviewApi, ApiKeysApi, UsageApi, ModelsApi, BillingApi, LogsApi, SettingsApi,
} from './api';
import {
  MOCK_OVERVIEW_STATS, MOCK_MODEL_HEALTH, MOCK_ACTIVITY,
  MOCK_KEYS, MOCK_USAGE, MOCK_MODELS, MOCK_BILLING, MOCK_LOGS, MOCK_ORG,
  mockCreateKey,
} from '../mock/mock-data';
import { ApiKey, CreateKeyRequest, UsagePeriod, RequestStatus } from '../models';

const SIMULATED_DELAY = 320;

@Injectable({ providedIn: 'any' })
export class MockOverviewApi extends OverviewApi {
  getStats() { return of(MOCK_OVERVIEW_STATS).pipe(delay(SIMULATED_DELAY)); }
  getModelHealth() { return of(MOCK_MODEL_HEALTH).pipe(delay(SIMULATED_DELAY)); }
  getActivity() { return of(MOCK_ACTIVITY).pipe(delay(SIMULATED_DELAY)); }
}

@Injectable({ providedIn: 'any' })
export class MockApiKeysApi extends ApiKeysApi {
  private keys: ApiKey[] = [...MOCK_KEYS];

  list() { return of([...this.keys]).pipe(delay(SIMULATED_DELAY)); }

  create(req: CreateKeyRequest) {
    const result = mockCreateKey(req);
    this.keys.unshift(result.key);
    return of(result).pipe(delay(SIMULATED_DELAY));
  }

  revoke(id: string) {
    const key = this.keys.find(k => k.id === id);
    if (key) key.status = 'revoked';
    return of(undefined as void).pipe(delay(SIMULATED_DELAY));
  }
}

@Injectable({ providedIn: 'any' })
export class MockUsageApi extends UsageApi {
  getSummary(period: UsagePeriod) {
    return of({ ...MOCK_USAGE, period }).pipe(delay(SIMULATED_DELAY));
  }
}

@Injectable({ providedIn: 'any' })
export class MockModelsApi extends ModelsApi {
  list() { return of([...MOCK_MODELS]).pipe(delay(SIMULATED_DELAY)); }
}

@Injectable({ providedIn: 'any' })
export class MockBillingApi extends BillingApi {
  getSummary() { return of({ ...MOCK_BILLING }).pipe(delay(SIMULATED_DELAY)); }
}

@Injectable({ providedIn: 'any' })
export class MockLogsApi extends LogsApi {
  list(filter?: { status?: RequestStatus; modelId?: string; limit?: number }) {
    let logs = [...MOCK_LOGS];
    if (filter?.status) logs = logs.filter(l => l.status === filter.status);
    if (filter?.modelId) logs = logs.filter(l => l.modelId === filter.modelId);
    if (filter?.limit) logs = logs.slice(0, filter.limit);
    return of(logs).pipe(delay(SIMULATED_DELAY));
  }

  getById(id: string) {
    return of(MOCK_LOGS.find(l => l.id === id)).pipe(delay(SIMULATED_DELAY));
  }
}

@Injectable({ providedIn: 'any' })
export class MockSettingsApi extends SettingsApi {
  private org = { ...MOCK_ORG };

  getOrg() { return of({ ...this.org }).pipe(delay(SIMULATED_DELAY)); }

  updateOrgName(name: string) {
    this.org.orgName = name;
    return of(undefined as void).pipe(delay(SIMULATED_DELAY));
  }
}
