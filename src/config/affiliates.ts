export const affiliateConfig = {
  rdStation: {
    baseUrl: 'https://rdstation.com/pt',
    utm: {
      source: 'comparar-software',
      medium: 'comparison',
      campaign: 'affiliate'
    }
  },
  pipedrive: {
    baseUrl: 'https://www.pipedrive.com',
    utm: {
      source: 'comparar-software',
      medium: 'comparison',
      campaign: 'affiliate'
    }
  },
  asana: {
    baseUrl: 'https://www.asana.com',
    utm: {
      source: 'comparar-software',
      medium: 'comparison',
      campaign: 'affiliate'
    }
  },
  monday: {
    baseUrl: 'https://www.monday.com',
    utm: {
      source: 'comparar-software',
      medium: 'comparison',
      campaign: 'affiliate'
    }
  },
  hubspot: {
    baseUrl: 'https://www.hubspot.com/pt',
    utm: {
      source: 'comparar-software',
      medium: 'comparison',
      campaign: 'affiliate'
    }
  }
};

export function buildAffiliateUrl(baseUrl: string, toolSlug: string): string {
  if (baseUrl === '#') {
    return '#';
  }

  const url = new URL(baseUrl);
  const utm = affiliateConfig[toolSlug as keyof typeof affiliateConfig]?.utm ||
    { source: 'comparar-software', medium: 'comparison', campaign: 'affiliate' };

  url.searchParams.append('utm_source', utm.source);
  url.searchParams.append('utm_medium', utm.medium);
  url.searchParams.append('utm_campaign', utm.campaign);
  url.searchParams.append('utm_content', toolSlug);

  return url.toString();
}

export function getAffiliateLink(affiliateUrl: string, toolSlug: string): string {
  if (affiliateUrl === '#') {
    return '#';
  }
  return buildAffiliateUrl(affiliateUrl, toolSlug);
}
