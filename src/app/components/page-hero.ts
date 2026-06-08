import { Component, Input } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';
import { HeroFluidShaderComponent } from './hero-fluid-shader';
import { StatusPillComponent, type StatusVariant } from './status-pill';

export interface PageHeroKpi {
  value: string;
  label: string;
  qualifier?: string;
  highlight?: boolean;
}

export interface PageHeroImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Desktop: absolute right column with blend masks */
  desktopBlend?: boolean;
  /** Mobile: full-width above copy */
  mobileBlendOpacity?: number;
}

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [LucideAngularModule, HeroFluidShaderComponent, StatusPillComponent],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss',
})
export class PageHeroComponent {
  @Input({ required: true }) statusLabel!: string;
  @Input() statusVariant: StatusVariant = 'live';
  @Input() icon?: LucideIconData;
  @Input() iconLabel?: string;
  @Input() image?: PageHeroImage | null;
  @Input() kpis: PageHeroKpi[] = [];
  @Input() borderBottom = true;
}
