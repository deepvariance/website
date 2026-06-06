import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lock, LucideAngularModule } from 'lucide-angular';
import { FOOTER_NAV_COLUMNS } from '../data/site-nav';
import { WordmarkComponent } from './wordmark';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, WordmarkComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly Lock = Lock;
  readonly navColumns = FOOTER_NAV_COLUMNS;
}
