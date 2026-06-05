import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FOOTER_NAV_COLUMNS } from '../data/site-nav';
import { WordmarkComponent } from './wordmark';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, WordmarkComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly navColumns = FOOTER_NAV_COLUMNS;
}
