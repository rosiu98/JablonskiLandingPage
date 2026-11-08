/**
 * Build-time JSON-LD for this static site. Import from a local maintenance script
 * and serialize the result into the document head; do not ship this module to browsers.
 *
 * const graph = buildGraph({ path: '/o-mnie/', title, description,
 *   image: '/images/jerzy-instruktor.jpg' });
 * const json = JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');
 *
 * Reference: https://schema.org/LocalBusiness, https://schema.org/Service,
 * https://schema.org/WebPage, https://schema.org/BreadcrumbList.
 * LocalBusiness is deliberate: ProfessionalService is deprecated, and
 * DrivingSchool is not a defined schema.org type. FAQ uses ordinary WebPage.
 */

const SITE = 'https://jablonski-naukajazdy.pl/';
const PERSON_ID = `${SITE}#person`;
const BUSINESS_ID = `${SITE}#business`;
const WEBSITE_ID = `${SITE}#website`;
const MAP = 'https://maps.app.goo.gl/A5hbVNXGcynupmzNA';
const PHONE = '+48606720252';
const EMAIL = 'jablonskiprawko@gmail.com';

const SERVICES = [
  {
    path: '/nauka-jazdy/kategoria-b/',
    name: 'Kurs prawa jazdy kategorii B',
    serviceType: 'Nauka jazdy kategorii B',
    description: 'Nauka jazdy samochodem osobowym oraz przygotowanie do egzaminu na prawo jazdy kategorii B w Krakowie i Proszowicach.',
  },
  {
    path: '/nauka-jazdy/kategoria-c/',
    name: 'Kurs prawa jazdy kategorii C',
    serviceType: 'Nauka jazdy kategorii C',
    description: 'Szkolenie w prowadzeniu samochodu ciężarowego oraz przygotowanie do egzaminu na prawo jazdy kategorii C w Krakowie i Proszowicach.',
  },
  {
    path: '/nauka-jazdy/kategoria-c-e/',
    name: 'Kurs prawa jazdy kategorii C+E',
    serviceType: 'Nauka jazdy kategorii C+E',
    description: 'Szkolenie w prowadzeniu pojazdu ciężarowego z przyczepą lub naczepą oraz przygotowanie do egzaminu kategorii C+E w Krakowie i Proszowicach.',
  },
  {
    path: '/nauka-jazdy/jazdy-doszkalajace/',
    name: 'Jazdy doszkalające',
    serviceType: 'Jazdy doszkalające kategorii B, C i C+E',
    description: 'Indywidualne jazdy doszkalające z Jerzym Jabłońskim w Krakowie i Proszowicach: ćwiczenie manewrów, powrót za kierownicę i przygotowanie do egzaminu.',
  },
];

const LABELS = {
  '/': 'Strona główna',
  '/nauka-jazdy/': 'Nauka jazdy',
  '/lokalizacje/': 'Lokalizacje',
  '/o-mnie/': 'O mnie',
  '/cennik/': 'Cennik',
  '/opinie/': 'Opinie',
  '/kontakt/': 'Kontakt',
  '/faq/': 'FAQ',
  '/nauka-jazdy/kategoria-b/': 'Kategoria B',
  '/nauka-jazdy/kategoria-c/': 'Kategoria C',
  '/nauka-jazdy/kategoria-c-e/': 'Kategoria C+E',
  '/nauka-jazdy/jazdy-doszkalajace/': 'Jazdy doszkalające',
  '/lokalizacje/nauka-jazdy-krakow/': 'Nauka jazdy Kraków',
  '/lokalizacje/nauka-jazdy-proszowice/': 'Nauka jazdy Proszowice',
};

const PAGE_TYPES = new Set(['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage']);

const ref = (id) => ({ '@id': id });
const absolute = (path) => new URL(path, SITE).href;
const areaServed = () => [
  { '@type': 'City', name: 'Kraków' },
  { '@type': 'City', name: 'Proszowice' },
];

function canonicalPath(value = '/') {
  const url = new URL(String(value).replace(/\\/g, '/'), SITE);
  if (url.origin !== new URL(SITE).origin) {
    throw new TypeError('A page or breadcrumb must belong to jablonski-naukajazdy.pl.');
  }
  const path = url.pathname.replace(/\/index\.html$/i, '/').replace(/\/{2,}/g, '/');
  return path === '/' ? path : `${path.replace(/\/+$/, '')}/`;
}

function requiredText(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value.trim();
}

function defaultBreadcrumbs(path, title) {
  if (path === '/') return [];
  const crumbs = [{ name: LABELS['/'], path: '/' }];
  if (path.startsWith('/nauka-jazdy/') && path !== '/nauka-jazdy/') {
    crumbs.push({ name: LABELS['/nauka-jazdy/'], path: '/nauka-jazdy/' });
  } else if (path.startsWith('/lokalizacje/') && path !== '/lokalizacje/') {
    crumbs.push({ name: LABELS['/lokalizacje/'], path: '/lokalizacje/' });
  }
  crumbs.push({ name: LABELS[path] ?? title, path });
  return crumbs;
}

function buildBreadcrumbs(page, path, title) {
  const crumbs = page.breadcrumbs ?? defaultBreadcrumbs(path, title);
  if (!Array.isArray(crumbs)) throw new TypeError('breadcrumbs must be an array.');
  // A homepage has no hierarchy above it; avoid a one-item rich-result breadcrumb.
  if (crumbs.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absolute(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: requiredText(crumb.name, 'Breadcrumb name'),
      item: absolute(canonicalPath(crumb.path ?? crumb.url ?? crumb.item)),
    })),
  };
}

function buildImage(input, path, fallbackCaption) {
  if (!input) return null;
  const image = typeof input === 'string' ? { url: input } : input;
  const url = new URL(requiredText(image.url ?? image.contentUrl, 'Image URL'), SITE);
  if (!['https:', 'http:'].includes(url.protocol)) {
    throw new TypeError('Image URL must use HTTP or HTTPS.');
  }
  const result = {
    '@type': 'ImageObject',
    '@id': `${absolute(path)}#primaryimage`,
    url: url.href,
    contentUrl: url.href,
    caption: image.caption || fallbackCaption,
  };
  for (const dimension of ['width', 'height']) {
    if (Number.isInteger(image[dimension]) && image[dimension] > 0) {
      result[dimension] = image[dimension];
    }
  }
  return result;
}

function buildService(service, page, image) {
  const url = absolute(service.path);
  const current = canonicalPath(page.path) === service.path;
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: current ? page.description.trim() : service.description,
    url,
    provider: ref(PERSON_ID),
    areaServed: areaServed(),
    mainEntityOfPage: ref(`${url}#webpage`),
    ...(current && image ? { image: ref(image['@id']) } : {}),
  };
}

/**
 * @param {object} page
 * @param {string} page.path Canonical pathname or local index.html path.
 * @param {string} page.title The document's visible/meta title, already decoded.
 * @param {string} page.description The document's meta description, already decoded.
 * @param {string|{url:string,caption?:string,width?:number,height?:number}} [page.image]
 *   An image actually used on this page, not an invented illustration.
 * @param {string} [page.imageAlt] Caption when page.image is a URL string.
 * @param {'WebPage'|'AboutPage'|'ContactPage'|'CollectionPage'} [page.type]
 * @param {Array<{name:string,path?:string,url?:string,item?:string}>} [page.breadcrumbs]
 *   Match the hierarchy rendered in the page; defaults include both new hubs.
 * @returns {{'@context':string,'@graph':object[]}} Complete static JSON-LD document.
 */
export function buildGraph(page) {
  if (!page || typeof page !== 'object') throw new TypeError('A page object is required.');
  const path = canonicalPath(page.path);
  const url = absolute(path);
  const title = requiredText(page.title, 'Page title');
  const description = requiredText(page.description, 'Page description');
  const service = SERVICES.find((item) => item.path === path);
  const locationPage = path.startsWith('/lokalizacje/') && path !== '/lokalizacje/';
  const serviceCollection = ['/', '/nauka-jazdy/', '/cennik/'].includes(path);
  const services = service ? [service] : serviceCollection || locationPage ? SERVICES : [];
  const inferredType = path === '/o-mnie/' ? 'AboutPage'
    : path === '/kontakt/' ? 'ContactPage'
      : ['/nauka-jazdy/', '/lokalizacje/', '/cennik/', '/opinie/'].includes(path)
        ? 'CollectionPage' : 'WebPage';
  const type = page.type ?? inferredType;
  if (!PAGE_TYPES.has(type)) throw new TypeError(`Unsupported page type: ${type}`);

  const image = buildImage(page.image, path, page.imageAlt || title);
  const breadcrumbs = buildBreadcrumbs(page, path, title);
  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Jerzy Jabłoński',
    url: absolute('/o-mnie/'),
    jobTitle: 'Instruktor nauki jazdy',
    description: 'Jerzy Jabłoński – instruktor nauki jazdy z ponad 25-letnim doświadczeniem, prowadzący szkolenia oraz jazdy doszkalające w Proszowicach i Krakowie.',
    telephone: PHONE,
    email: EMAIL,
    image: absolute('/images/jerzy-instruktor.jpg'),
    knowsAbout: ['Nauka jazdy', 'Prawo jazdy kategorii B', 'Prawo jazdy kategorii C', 'Prawo jazdy kategorii C+E', 'Jazdy doszkalające', 'Przygotowanie do egzaminu na prawo jazdy'],
    worksFor: ref(BUSINESS_ID),
    mainEntityOfPage: ref(`${absolute('/o-mnie/')}#webpage`),
  };
  const business = {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: 'Nauka Jazdy | Jerzy Jabłoński | kat. B, C, C+E',
    url: SITE,
    telephone: PHONE,
    email: EMAIL,
    logo: absolute('/images/Logo.svg'),
    image: absolute('/images/auto-szkoleniowe.jpg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bogusława Kleszczyńskiego 10',
      postalCode: '32-100',
      addressLocality: 'Proszowice',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.1873221,
      longitude: 20.3079803,
    },
    hasMap: MAP,
    sameAs: ['https://www.google.com/maps?cid=8886140804937499843'],
    areaServed: areaServed(),
  };
  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: 'Jerzy Jabłoński – Nauka Jazdy',
    description: 'Nauka jazdy i jazdy doszkalające z Jerzym Jabłońskim w Proszowicach i Krakowie.',
    inLanguage: 'pl-PL',
    publisher: ref(BUSINESS_ID),
    author: ref(PERSON_ID),
  };
  const webpage = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'pl-PL',
    isPartOf: ref(WEBSITE_ID),
    publisher: ref(BUSINESS_ID),
    author: ref(PERSON_ID),
    about: [ref(PERSON_ID), ref(BUSINESS_ID)],
    mainEntity: ref(['/', '/o-mnie/'].includes(path) ? PERSON_ID : service ? `${url}#service` : BUSINESS_ID),
    ...(image ? { primaryImageOfPage: ref(image['@id']), image: ref(image['@id']) } : {}),
    ...(breadcrumbs ? { breadcrumb: ref(breadcrumbs['@id']) } : {}),
    ...(services.length && !service ? { mentions: services.map((item) => ref(`${absolute(item.path)}#service`)) } : {}),
  };

  if (locationPage) {
    webpage.spatialCoverage = {
      '@type': 'City',
      name: path.includes('krakow') ? 'Kraków' : 'Proszowice',
    };
  }

  let list = null;
  if (['/nauka-jazdy/', '/cennik/'].includes(path)) {
    list = {
      '@type': 'ItemList',
      '@id': `${url}#services`,
      name: path === '/cennik/' ? 'Usługi w cenniku' : 'Nauka jazdy i jazdy doszkalające',
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: ref(`${absolute(item.path)}#service`),
      })),
    };
  } else if (path === '/lokalizacje/') {
    const locations = ['/lokalizacje/nauka-jazdy-krakow/', '/lokalizacje/nauka-jazdy-proszowice/'];
    list = {
      '@type': 'ItemList',
      '@id': `${url}#locations`,
      name: 'Obszar prowadzenia nauki jazdy',
      numberOfItems: locations.length,
      itemListElement: locations.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          '@id': `${absolute(item)}#webpage`,
          name: LABELS[item],
          url: absolute(item),
        },
      })),
    };
  }
  if (list) webpage.mainEntity = ref(list['@id']);

  return {
    '@context': 'https://schema.org',
    '@graph': [person, business, website, webpage,
      ...(image ? [image] : []),
      ...(breadcrumbs ? [breadcrumbs] : []),
      ...services.map((item) => buildService(item, { ...page, path, description }, image)),
      ...(list ? [list] : []),
    ],
  };
}
