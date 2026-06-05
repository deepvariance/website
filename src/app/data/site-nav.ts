/** How RouterLinkActive matches the current URL. */
export type SiteNavMatch = 'exact' | 'subset';

export interface SiteNavLink {
  path: string;
  label: string;
  match: SiteNavMatch;
}

/**
 * Documentation — locked in global chrome (header + footer).
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
  {
    path: LOCKED_DOCS_NAV.path,
    label: LOCKED_DOCS_NAV.headerLabel,
    match: LOCKED_DOCS_NAV.match,
  },
];

export interface FooterNavLink {
  path: string;
  label: string;
  external?: boolean;
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
      { path: LOCKED_DOCS_NAV.path, label: LOCKED_DOCS_NAV.footerLabel },
      {
        path: 'https://www.linkedin.com/company/deep-variance/jobs/',
        label: 'Careers',
        external: true,
      },
    ],
  },
];
