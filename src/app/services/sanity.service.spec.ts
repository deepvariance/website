import { buildSanityQueryBaseUrl, SanityConfig } from './sanity.service';

describe('buildSanityQueryBaseUrl', () => {
  const baseConfig: SanityConfig = {
    projectId: 'em4l2is0',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  };

  it('uses the Sanity API host when CDN is disabled', () => {
    expect(buildSanityQueryBaseUrl(baseConfig)).toBe(
      'https://em4l2is0.api.sanity.io/v2024-01-01/data/query/production',
    );
  });

  it('uses the Sanity API CDN host when CDN is enabled', () => {
    expect(buildSanityQueryBaseUrl({ ...baseConfig, useCdn: true })).toBe(
      'https://em4l2is0.apicdn.sanity.io/v2024-01-01/data/query/production',
    );
  });
});
