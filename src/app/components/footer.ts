import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordmarkComponent } from './wordmark';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, WordmarkComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {}
