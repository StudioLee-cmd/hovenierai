import React from 'react';
import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';

/**
 * SiteSchema — Organization + WebSite JSON-LD voor de HOMEPAGE.
 *
 * Gedeelde 90/10-core: deze component is byte-identiek over de hele niche-fleet; élke waarde
 * komt uit de per-site data-laag (src/data/siteDetails.ts + src/data/footer.ts). Nooit een
 * waarde hier hardcoden — een nieuw merk-gegeven hoort in die data-files, dan derivet het
 * schema vanzelf mee.
 *
 * Waarom alleen de homepage: dit is de pagina die het MERK aan Google uitlegt (de entity).
 * Blog-artikelen dragen hun eigen Article + BreadcrumbList, de service-pillars hun FAQPage —
 * die blijven ongemoeid.
 *
 * Bewust GEEN LocalBusiness: de niche-AI-merken zijn landelijke dienst-/SaaS-merken zonder
 * eigen vestiging per niche. LocalBusiness zonder openingstijden, geo of publieks-vestiging
 * is schema-residu (doctrine technical_seo_audit: per pagina-type precies het juiste type,
 * nooit meer). Om dezelfde reden staat er geen telephone in: het nummer in footer.ts is een
 * placeholder (+31612345678) en een verzonnen nummer hoort niet in structured data.
 */

const BASE = siteDetails.siteUrl.replace(/\/+$/, '');

// 'De Donge 9, 3448CJ, Woerden' -> PostalAddress. Alleen bij exact 'straat, postcode, plaats';
// bij elke andere vorm laten we het veld weg (liever geen adres dan een fout adres).
const addressParts = (footerDetails.address || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

const postalAddress =
    addressParts.length === 3
        ? {
              '@type': 'PostalAddress',
              streetAddress: addressParts[0],
              postalCode: addressParts[1],
              addressLocality: addressParts[2],
              addressCountry: 'NL',
          }
        : undefined;

const sameAs = Object.values(footerDetails.socials || {}).filter(
    (url): url is string => typeof url === 'string' && url.startsWith('http')
);

const organization = {
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: siteDetails.siteName,
    legalName: footerDetails.legalName,
    url: `${BASE}/`,
    description: siteDetails.metadata.description,
    logo: {
        '@type': 'ImageObject',
        url: `${BASE}${siteDetails.siteLogo}`,
    },
    image: `${BASE}${siteDetails.siteLogo}`,
    email: footerDetails.email,
    ...(postalAddress ? { address: postalAddress } : {}),
    ...(footerDetails.btw ? { vatID: footerDetails.btw } : {}),
    ...(footerDetails.kvk
        ? {
              identifier: {
                  '@type': 'PropertyValue',
                  name: 'KvK',
                  value: footerDetails.kvk,
              },
          }
        : {}),
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: { '@type': 'Country', name: 'Nederland' },
};

const website = {
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: `${BASE}/`,
    name: siteDetails.siteName,
    description: siteDetails.metadata.description,
    inLanguage: siteDetails.language || 'nl-NL',
    publisher: { '@id': `${BASE}/#organization` },
};

const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
};

// `<` escapen: een merk-/beschrijvingswaarde die ooit een `</script>` bevat zou anders het
// inline-script breken (en dan is de hele pagina stuk, niet alleen het schema).
const json = JSON.stringify(siteSchema).replace(/</g, '\\u003c');

const SiteSchema: React.FC = () => (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
);

export default SiteSchema;
