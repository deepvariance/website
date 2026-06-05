import { Component, inject, signal, computed, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Send, Square, Copy, Check } from 'lucide-angular';
import { ModelsApi } from '../../services/api';
import { HostedModel } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';

const MOCK_COMPLETIONS = [
  `\`\`\`python
async def process_repository(repo_path: str, model_client: DVClient) -> AnalysisResult:
    """
    Analyzes a codebase using the DV-Gemma2-27B-IT model with prefix caching.
    
    Strategy: Send the repository context once (cached), then stream
    per-file questions cheaply using the cached prefix.
    """
    files = await gather_source_files(repo_path)
    
    # Build shared system context (will be cached after first request)
    system_ctx = build_repo_context(files)
    
    results = []
    async for file_analysis in model_client.stream(
        model="dv-gemma2-27b-it",
        messages=[
            {"role": "system", "content": system_ctx},
            {"role": "user", "content": f"Analyze security vulnerabilities in: {files[0]}"}
        ],
        temperature=0.2,
        max_tokens=2048,
    ):
        results.append(file_analysis)
    
    return AnalysisResult(files=results, cached_tokens=system_ctx.token_count)
\`\`\`

The implementation uses a shared repository context that gets prefix-cached after the first request, making subsequent per-file queries dramatically cheaper and faster.`,
  `Here's how to implement streaming completions with the Deep Variance API:

\`\`\`typescript
import { DVClient } from "@deepvariance/sdk";

const client = new DVClient({ apiKey: process.env.DV_API_KEY });

async function streamCompletion(prompt: string) {
  const stream = await client.completions.stream({
    model: "dv-gemma2-27b-it",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1024,
    temperature: 0.7,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
  }
  
  console.log("\\nDone. TTFT:", stream.ttft, "ms");
}
\`\`\``,
];

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, PageHeaderComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Playground" subtitle="Test completions interactively with live latency metrics" />

      <div class="playground-layout">
        <!-- Params panel -->
        <div class="params-panel">
          <div class="params-header"><span class="section-label">Configuration</span></div>
          <div class="params-body">
            <div class="param-field">
              <label class="param-label">Model</label>
              <select class="param-select" [(ngModel)]="selectedModelId">
                @for (m of models(); track m.id) {
                  @if (m.status !== 'soon') {
                    <option [value]="m.id">{{ m.name }}</option>
                  }
                }
              </select>
            </div>
            <div class="param-field">
              <label class="param-label">Temperature <span class="param-val">{{ temperature }}</span></label>
              <input type="range" min="0" max="2" step="0.05" [(ngModel)]="temperature" class="param-range" />
              <div class="range-ends"><span>0</span><span>2</span></div>
            </div>
            <div class="param-field">
              <label class="param-label">Max tokens <span class="param-val">{{ maxTokens }}</span></label>
              <input type="range" min="64" max="4096" step="64" [(ngModel)]="maxTokens" class="param-range" />
              <div class="range-ends"><span>64</span><span>4096</span></div>
            </div>
            <div class="param-field">
              <label class="param-label">Top-p <span class="param-val">{{ topP }}</span></label>
              <input type="range" min="0" max="1" step="0.05" [(ngModel)]="topP" class="param-range" />
              <div class="range-ends"><span>0</span><span>1</span></div>
            </div>
          </div>

          <!-- Latency readout -->
          @if (ttft() !== null || generating()) {
            <div class="latency-panel">
              <div class="latency-row">
                <span class="latency-label">TTFT</span>
                <span class="latency-val">{{ ttft() !== null ? ttft() + 'ms' : '—' }}</span>
              </div>
              <div class="latency-row">
                <span class="latency-label">TPOT</span>
                <span class="latency-val">{{ tpot() !== null ? tpot() + 'ms' : '—' }}</span>
              </div>
              <div class="latency-row">
                <span class="latency-label">Tokens out</span>
                <span class="latency-val">{{ tokensOut() }}</span>
              </div>
            </div>
          }
        </div>

        <!-- Main completion area -->
        <div class="completion-panel">
          <!-- Input -->
          <div class="input-section">
            <label class="section-label">Prompt</label>
            <textarea
              class="prompt-textarea"
              [(ngModel)]="prompt"
              placeholder="Enter your prompt here… e.g. 'Write an async Python function that processes a list of files'"
              rows="5"
            ></textarea>
            <div class="send-row">
              @if (!generating()) {
                <button class="btn-primary btn--sm send-btn" [disabled]="!prompt.trim()" (click)="generate()">
                  <lucide-icon [img]="Send" [size]="13" />
                  Generate
                </button>
              } @else {
                <button class="btn-secondary btn--sm send-btn" (click)="stop()">
                  <lucide-icon [img]="Square" [size]="13" />
                  Stop
                </button>
              }
            </div>
          </div>

          <!-- Output -->
          @if (output() || generating()) {
            <div class="output-section">
              <div class="output-header">
                <span class="section-label">Completion</span>
                @if (!generating() && output()) {
                  <button class="copy-output-btn" (click)="copyOutput()">
                    <lucide-icon [img]="copiedOutput() ? Check : Copy" [size]="12" />
                    {{ copiedOutput() ? 'Copied' : 'Copy' }}
                  </button>
                }
              </div>
              <div class="output-body">
                <pre class="output-text">{{ output() }}<span class="cursor" [class.cursor--visible]="generating()">▊</span></pre>
              </div>
            </div>
          }

          <!-- Code snippet -->
          <div class="snippet-section">
            <div class="snippet-tabs">
              @for (t of snippetTabs; track t) {
                <button class="snippet-tab" [class.snippet-tab--active]="snippetTab() === t" (click)="snippetTab.set(t)">{{ t }}</button>
              }
            </div>
            <div class="snippet-body">
              <pre class="snippet-code">{{ snippetCode() }}</pre>
              <button class="snippet-copy" (click)="copySnippet()">
                <lucide-icon [img]="copiedSnippet() ? Check : Copy" [size]="12" />
                {{ copiedSnippet() ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 1440px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .playground-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 900px) { .playground-layout { grid-template-columns: 1fr; } }

    .section-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }

    /* Params */
    .params-panel { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .params-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .params-body { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .param-field { display: flex; flex-direction: column; gap: 6px; }
    .param-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); display: flex; justify-content: space-between; }
    .param-val { color: var(--text-secondary); }
    .param-select { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 7px 10px; font-family: var(--font-body); font-size: 11px; color: var(--text-primary); width: 100%; outline: none; }
    .param-range { width: 100%; accent-color: #7b61ff; cursor: pointer; }
    .range-ends { display: flex; justify-content: space-between; font-family: var(--font-body); font-size: 9px; color: var(--text-faint); }

    .latency-panel { margin: 0 16px 16px; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
    .latency-row { display: flex; justify-content: space-between; align-items: center; }
    .latency-label { font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); }
    .latency-val { font-family: var(--font-display,sans-serif); font-size: 14px; font-weight: 700; color: var(--text-primary); }

    /* Completion panel */
    .completion-panel { display: flex; flex-direction: column; gap: 16px; }

    .input-section { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .prompt-textarea { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; font-family: var(--font-body); font-size: 12px; color: var(--dv-blue-dim); outline: none; resize: vertical; width: 100%; line-height: 1.6; }
    .prompt-textarea:focus { border-color: rgba(255,255,255,0.2); }
    .prompt-textarea::placeholder { color: var(--text-faint); }
    .send-row { display: flex; justify-content: flex-end; }
    .send-btn { display: flex; align-items: center; gap: 6px; }

    .output-section { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .output-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .copy-output-btn { display: flex; align-items: center; gap: 5px; font-family: var(--font-body); font-size: 10px; color: var(--text-muted); background: none; border: none; cursor: pointer; }
    .copy-output-btn:hover { color: var(--text-primary); }
    .output-body { padding: 16px; max-height: 320px; overflow-y: auto; }
    .output-text { font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); white-space: pre-wrap; line-height: 1.65; margin: 0; }
    .cursor { opacity: 0; }
    .cursor--visible { opacity: 1; animation: blink 1s step-end infinite; }
    @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }

    /* Snippet */
    .snippet-section { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .snippet-tabs { display: flex; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .snippet-tab { padding: 10px 16px; font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; background: none; border: none; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
    .snippet-tab--active { color: var(--text-primary); border-bottom-color: var(--text-primary); }
    .snippet-body { position: relative; padding: 16px; }
    .snippet-code { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); white-space: pre; overflow-x: auto; margin: 0; line-height: 1.6; }
    .snippet-copy { position: absolute; top: 12px; right: 12px; display: flex; align-items: center; gap: 5px; font-family: var(--font-body); font-size: 10px; color: var(--text-muted); background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 4px 8px; cursor: pointer; }
    .snippet-copy:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.2); }
  `],
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  private modelsApi = inject(ModelsApi);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  readonly Send = Send;
  readonly Square = Square;
  readonly Copy = Copy;
  readonly Check = Check;

  readonly models = signal<HostedModel[]>([]);
  selectedModelId = 'dv-gemma2-27b-it';
  temperature = 0.7;
  maxTokens = 1024;
  topP = 1.0;
  prompt = '';

  readonly generating = signal(false);
  readonly output = signal('');
  readonly ttft = signal<number | null>(null);
  readonly tpot = signal<number | null>(null);
  readonly tokensOut = signal(0);
  readonly copiedOutput = signal(false);
  readonly copiedSnippet = signal(false);

  readonly snippetTabs = ['cURL', 'Python', 'TypeScript'];
  readonly snippetTab = signal('cURL');

  private streamTimer: ReturnType<typeof setTimeout> | null = null;
  private completionIdx = 0;

  ngOnInit() {
    this.modelsApi.list().subscribe(m => this.models.set(m));
    this.route.queryParams.subscribe(p => {
      if (p['model']) this.selectedModelId = p['model'];
    });
  }

  ngOnDestroy() {
    if (this.streamTimer) clearTimeout(this.streamTimer);
  }

  generate() {
    if (!this.prompt.trim()) return;
    this.output.set('');
    this.ttft.set(null);
    this.tpot.set(null);
    this.tokensOut.set(0);
    this.generating.set(true);

    const target = MOCK_COMPLETIONS[this.completionIdx % MOCK_COMPLETIONS.length];
    this.completionIdx++;

    const chars = target.split('');
    let i = 0;
    const startMs = Date.now();
    let ttftSet = false;

    const tick = () => {
      if (!this.generating()) return;
      const chunkSize = 3 + Math.floor(Math.random() * 5);
      const chunk = chars.slice(i, i + chunkSize).join('');
      i += chunkSize;
      this.output.update(v => v + chunk);
      this.tokensOut.update(n => n + Math.ceil(chunkSize / 4));

      if (!ttftSet) {
        const elapsed = Date.now() - startMs;
        if (elapsed > 180) {
          this.ttft.set(2100 + Math.floor(Math.random() * 400));
          this.tpot.set(12 + Math.floor(Math.random() * 6));
          ttftSet = true;
        }
      }

      if (i < chars.length) {
        this.streamTimer = setTimeout(tick, 18 + Math.random() * 20);
      } else {
        this.generating.set(false);
      }
    };
    this.streamTimer = setTimeout(tick, 2100 + Math.floor(Math.random() * 400));
  }

  stop() {
    this.generating.set(false);
    if (this.streamTimer) clearTimeout(this.streamTimer);
  }

  copyOutput() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.output()).then(() => {
      this.copiedOutput.set(true);
      setTimeout(() => this.copiedOutput.set(false), 2000);
    }).catch(() => {});
  }

  copySnippet() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.snippetCode()).then(() => {
      this.copiedSnippet.set(true);
      setTimeout(() => this.copiedSnippet.set(false), 2000);
    }).catch(() => {});
  }

  readonly snippetCode = computed(() => {
    const tab = this.snippetTab();
    const model = this.selectedModelId;
    const promptEsc = this.prompt || 'Your prompt here';
    const temp = this.temperature;
    const maxTok = this.maxTokens;
    if (tab === 'cURL') return `curl https://api.deepvariance.com/v1/chat/completions \\
  -H "Authorization: Bearer $DV_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [{"role": "user", "content": "${promptEsc.slice(0, 60)}"}],
    "temperature": ${temp},
    "max_tokens": ${maxTok},
    "stream": true
  }'`;
    if (tab === 'Python') return `from deepvariance import DVClient

client = DVClient()  # reads DV_API_KEY from env

stream = client.chat.completions.create(
    model="${model}",
    messages=[{"role": "user", "content": "${promptEsc.slice(0, 60)}"}],
    temperature=${temp},
    max_tokens=${maxTok},
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`;
    return `import DVClient from "@deepvariance/sdk";

const client = new DVClient(); // reads DV_API_KEY from env

const stream = await client.chat.completions.stream({
  model: "${model}",
  messages: [{ role: "user", content: "${promptEsc.slice(0, 60)}" }],
  temperature: ${temp},
  maxTokens: ${maxTok},
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`;
  });
}
