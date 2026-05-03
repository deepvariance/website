import { Component, Input } from '@angular/core';

/**
 * Wordmark as a traced SVG (Inter Bold "deep" + Inter Regular "variance").
 * Paths were extracted with fonttools using the cv11 OpenType feature for
 * the single-story alternate 'a'. No font loading required.
 */
@Component({
  selector: 'app-wordmark',
  standalone: true,
  template: `
    <img
      src="/wordmark-traced.svg"
      [style.height.px]="size"
      style="width:auto;display:block;"
      alt="Deep Variance"
      draggable="false"
    />
  `,
  styles: [':host { display: inline-flex; align-items: center; }'],
})
export class WordmarkComponent {
  /** Height in px — width scales automatically from the SVG viewBox ratio. */
  @Input() size: number = 20;
}
