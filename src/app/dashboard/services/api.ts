import { Observable } from 'rxjs';
import {
  ApiKey, CreateKeyRequest, CreateKeyResponse,
  UsageSummary, UsagePeriod,
  HostedModel,
  BillingSummary,
  RequestLogEntry, RequestStatus,
  OverviewStats, ModelHealth, ActivityEvent,
  OrgSettings,
} from '../models';

export abstract class OverviewApi {
  abstract getStats(): Observable<OverviewStats>;
  abstract getModelHealth(): Observable<ModelHealth[]>;
  abstract getActivity(): Observable<ActivityEvent[]>;
}

export abstract class ApiKeysApi {
  abstract list(): Observable<ApiKey[]>;
  abstract create(req: CreateKeyRequest): Observable<CreateKeyResponse>;
  abstract revoke(id: string): Observable<void>;
}

export abstract class UsageApi {
  abstract getSummary(period: UsagePeriod): Observable<UsageSummary>;
}

export abstract class ModelsApi {
  abstract list(): Observable<HostedModel[]>;
}

export abstract class BillingApi {
  abstract getSummary(): Observable<BillingSummary>;
}

export abstract class LogsApi {
  abstract list(filter?: { status?: RequestStatus; modelId?: string; limit?: number }): Observable<RequestLogEntry[]>;
  abstract getById(id: string): Observable<RequestLogEntry | undefined>;
}

export abstract class SettingsApi {
  abstract getOrg(): Observable<OrgSettings>;
  abstract updateOrgName(name: string): Observable<void>;
}
