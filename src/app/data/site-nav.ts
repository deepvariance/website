/** How RouterLinkActive matches the current URL. */
export type SiteNavMatch = 'exact' | 'subset';

export interface SiteNavLink {
  path: string;
  label: string;
  match: SiteNavMatch;
  /** Locked items stay in nav but are not clickable (coming soon). */
  locked?: boolean;
}

/**
 * Documentation — locked in footer for now; omitted from header until launch.
 * Do not remove without product sign-off; update labels here only.
 */
export const LOCKED_DOCS_NAV = {
  path: '/docs',
  headerLabel: 'Docs',
  footerLabel: 'Documentation',
  match: 'subset' as const satisfies SiteNavMatch,
} as const;

/** Primary header links (desktop + mobile). */
export const HEADER_PRIMARY_NAV: readonly SiteNavLink[] = [
  { path: '/platform', label: 'Platform', match: 'subset' },
  { path: '/get-started', label: 'Get started', match: 'subset' },
  { path: '/use-cases', label: 'Use Cases', match: 'subset' },
];

export interface FooterNavLink {
  path: string;
  label: string;
  external?: boolean;
  locked?: boolean;
}

export interface FooterNavColumn {
  title: string;
  links: readonly FooterNavLink[];
}

/** Footer link columns — Documentation is locked in Explore. */
export const FOOTER_NAV_COLUMNS: readonly FooterNavColumn[] = [
  {
    title: 'Platform',
    links: [
      { path: '/platform', label: 'How it works' },
      { path: '/platform/optimemory', label: 'Optimemory' },
      { path: '/platform/hyperrag', label: 'HyperRAG' },
      { path: '/platform/deeptuner', label: 'DeepTuner' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { path: '/get-started', label: 'Get started' },
      { path: '/use-cases', label: 'Use cases' },
      { path: LOCKED_DOCS_NAV.path, label: LOCKED_DOCS_NAV.footerLabel, locked: true },
      {
        path: 'https://www.linkedin.com/company/deep-variance/jobs/',
        label: 'Careers',
        external: true,
      },
    ],
  },
];
