// Narzędzie lokalne: zapisuje metadane i JSON-LD bez zależności od JS w przeglądarce.
// Uruchom z katalogu projektu: node tools/update-seo.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { pages } from './seo-pages.mjs';
import { buildGraph } from './seo-schema.mjs';

const root = new URL('../', import.meta.url);
const site = 'https://jablonski-naukajazdy.pl';
const read = name => readFileSync(new URL(name, root), 'utf8').replace(/^\uFEFF/, '');
const write = (name, value) => writeFileSync(new URL(name, root), value, 'utf8');
const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (tag, name) => new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'is').exec(tag)?.[2];
const dimensions = JSON.parse(read('tools/seo-image-sizes.json'));
const aliases = {
  '/prawo-jazdy-kategoria-b/': '/nauka-jazdy/kategoria-b/',
  '/prawo-jazdy-kategoria-c/': '/nauka-jazdy/kategoria-c/',
  '/prawo-jazdy-kategoria-c-e/': '/nauka-jazdy/kategoria-c-e/',
  '/jazdy-doszkalajace/': '/nauka-jazdy/jazdy-doszkalajace/',
  '/nauka-jazdy-krakow/': '/lokalizacje/nauka-jazdy-krakow/',
  '/nauka-jazdy-proszowice/': '/lokalizacje/nauka-jazdy-proszowice/',
};

const footerLinks = [
  ['/', 'Główna'], ['/nauka-jazdy/', 'Nauka jazdy'], ['/lokalizacje/', 'Lokalizacje'],
  ['/o-mnie/', 'O mnie'], ['/cennik/', 'Cennik'], ['/opinie/', 'Opinie'], ['/faq/', 'FAQ'], ['/kontakt/', 'Kontakt'],
].map(([href, text]) => `<a href="${href}">${text}</a>`).join('\n              ');

const legalFooter = `<!-- LEGAL-FOOTER:BEGIN -->
<div class="footer__legal">
  <nav aria-label="Dokumenty i panel rezerwacji" class="footer__legal-links">
    <a href="/polityka-prywatnosci/">Polityka prywatności</a>
    <a href="/regulamin/">Regulamin panelu</a>
    <a href="https://panel.jablonski-naukajazdy.pl/" target="_blank" rel="noopener noreferrer">Panel rezerwacji jazd <span aria-hidden="true">↗</span></a>
  </nav>
  <p>Panel rezerwacji jazd Jerzego Jabłońskiego służy zaproszonym kursantom do umawiania i odwoływania jazd oraz podglądu rozliczeń godzin. Instruktor zarządza terminami i może synchronizować rezerwacje z wybranym Google Calendar. Zasady integracji opisuje polityka prywatności.</p>
</div>
<!-- LEGAL-FOOTER:END -->`;

// Read all inputs before writing, so a missing new page cannot leave a partial run.
const documents = pages.map(page => ({ page, name: `${page.path.slice(1)}index.html`, html: read(`${page.path.slice(1)}index.html`) }));
for (const { page, name, html: original } of documents) {
  let html = original.replace(/<!-- SEO:BEGIN -->[\s\S]*?<!-- SEO:END -->\s*/g, '');
  const graph = buildGraph({ ...page, image: { url: page.image, caption: page.imageAlt, ...dimensions[page.image] } });
  const url = site + page.path;
  const image = site + page.image;
  const size = dimensions[page.image];
  if (!size) throw new Error(`Missing image dimensions: ${page.image}`);
  const meta = [
    '<!-- SEO:BEGIN -->',
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}">`,
    `<link rel="canonical" href="${url}">`,
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="pl_PL">',
    '<meta property="og:site_name" content="Jerzy Jabłoński – Nauka Jazdy">',
    `<meta property="og:title" content="${escape(page.title)}">`,
    `<meta property="og:description" content="${escape(page.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:type" content="image/${page.image.endsWith('.webp') ? 'webp' : 'jpeg'}">`,
    `<meta property="og:image:width" content="${size.width}">`,
    `<meta property="og:image:height" content="${size.height}">`,
    `<meta property="og:image:alt" content="${escape(page.imageAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escape(page.title)}">`,
    `<meta name="twitter:description" content="${escape(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="twitter:image:alt" content="${escape(page.imageAlt)}">`,
    `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2).replace(/</g, '\\u003c')}\n</script>`,
    '<noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>',
    '<!-- SEO:END -->',
  ].join('\n');
  html = html.replace(/<head\b[^>]*>([\s\S]*?)<\/head>/i, (match, head) => {
    head = head.replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, '')
      .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, '')
      .replace(/<meta\b[^>]*>\s*/gi, tag => /^(description|robots|twitter:.*|og:.*)$/i.test(attr(tag, 'name') || attr(tag, 'property') || '') ? '' : tag)
      .replace(/<link\b[^>]*>\s*/gi, tag => attr(tag, 'rel') === 'canonical' ? '' : tag)
      .replace(/<script\b[^>]*src=["'][^"']*jquery[^"']*["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
    // Swiper is used only by the homepage testimonial carousel.
    if (!html.includes('class="testimonials-carousel"')) {
      head = head.replace(/<link\b[^>]*href=["'][^"']*Swiper[^"']*["'][^>]*>\s*/gi, '')
        .replace(/<script\b[^>]*src=["'][^"']*Swiper[^"']*["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
    }
    return `<head>${head.trimEnd()}\n${meta}\n</head>`;
  });
  // Keep all same-site references local and resolve legacy aliases in links.
  html = html.replace(/\b(href|src)=(["'])https:\/\/jablonski-naukajazdy\.pl(\/(?:images|sass)\/[^"']*)\2/g, '$1=$2$3$2');
  html = html.replace(/href=(["'])([^"']+)\1/gi, (match, quote, value) => {
    let target;
    try { target = new URL(value, site + page.path); } catch { return match; }
    if (target.origin !== site || !aliases[target.pathname]) return match;
    return `href=${quote}${aliases[target.pathname]}${target.search}${target.hash}${quote}`;
  });
  html = html.replace(/(<header\b[^>]*class=["'][^"']*jj-classic-nav[^"']*["'][^>]*>)([\s\S]*?)(<\/header>)/i, (match, start, content, end) => {
    content = content.replace(/\s+aria-current=["']page["']/g, '').replace(/\s+class=["']has-current["']/g, '');
    if (!content.includes('href="/nauka-jazdy/"')) content = content.replace(/(<div class="dropdown">)/, '$1\n       <a href="/nauka-jazdy/">Wszystkie szkolenia</a>');
    if (!content.includes('href="/lokalizacje/"')) content = content.replace(/(<div class="dropdown">)([\s\S]*?)(<div class="dropdown">)/, '$1$2$3\n       <a href="/lokalizacje/">Wszystkie lokalizacje</a>');
    content = content.replace(/<a\b[^>]*>/g, tag => attr(tag, 'href') === page.path ? tag.replace(/>$/, ' aria-current="page">') : tag);
    content = content.replace(/<details\b([^>]*)>([\s\S]*?)<\/details>/g, (all, attrs, inside) => `<details${attrs}>${inside.replace(/<summary\b([^>]*)>/, (all, summaryAttrs) => `<summary${summaryAttrs}${inside.includes('aria-current="page"') ? ' class="has-current"' : ''}>`)}</details>`);
    return start + content + end;
  });
  html = html.replace(/(<div class="footer__about__links__content">)[\s\S]*?(<\/div>)/, `$1\n              ${footerLinks}\n            $2`);
  html = html.replace(/<!-- LEGAL-FOOTER:BEGIN -->[\s\S]*?<!-- LEGAL-FOOTER:END -->\s*/g, '');
  html = html.replace(/(<footer\b[^>]*>)([\s\S]*?)(<\/footer>)/i, (match, start, content, end) => `${start}${content.trimEnd()}\n${legalFooter}\n${end}`);
  if (!html.includes('class="footer__address"')) {
    html = html.replace(/(<div class="footer__location__map">)/, '<address class="footer__address">Bogusława Kleszczyńskiego 10<br>32-100 Proszowice</address>\n          $1');
  }
  html = html.replace(/<!-- BREADCRUMBS:BEGIN -->[\s\S]*?<!-- BREADCRUMBS:END -->\s*/g, '');
  const breadcrumbs = graph['@graph'].find(node => node['@type'] === 'BreadcrumbList');
  if (breadcrumbs) {
    const items = breadcrumbs.itemListElement.map((item, index, list) => `<li>${index === list.length - 1 ? `<span aria-current="page">${escape(item.name)}</span>` : `<a href="${new URL(item.item).pathname}">${escape(item.name)}</a>`}</li>`).join('');
    html = html.replace(/(<main\b[^>]*>)/i, `$1\n<!-- BREADCRUMBS:BEGIN -->\n<nav class="seo-breadcrumbs" aria-label="Ścieżka nawigacji"><ol>${items}</ol></nav>\n<!-- BREADCRUMBS:END -->\n`);
  }
  html = html.replace(/<img\b[^>]*>/gi, tag => {
    const source = attr(tag, 'src');
    let result = tag;
    if (!/\balt\s*=/i.test(result)) result = result.replace(/\s*\/?>(\s*)$/, ' alt="">$1');
    if (dimensions[source] && !source.endsWith('.svg') && !/\bwidth\s*=|\bheight\s*=/i.test(result)) {
      const { width, height } = dimensions[source];
      result = result.replace(/\s*\/?>(\s*)$/, ` width="${width}" height="${height}">$1`);
    }
    return result;
  });
  html = html.replace(/(main\.css|script\.js)\?v=[^"']+/g, '$1?v=20261113-legal');
  write(name, html);
}

// Only real canonical pages. Dates are deliberately omitted instead of invented.
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => `  <url><loc>${site}${page.path}</loc></url>`).join('\n') + '\n</urlset>\n');
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
const redirects = Object.entries(aliases).flatMap(([from, to]) => [`${from} ${to} 301`, `${from.slice(0, -1)} ${to} 301`]);
redirects.push('/faq/faq.html /faq/ 301!', '/strona-glowna/ / 301', '/strona-glowna/index.html / 301!');
for (const page of pages) redirects.push(`${page.path}index.html ${page.path} 301!`);
write('_redirects', '# Netlify: exact legacy URLs; unknown URLs retain a real 404.\n' + redirects.join('\n') + '\n');
console.log(`SEO zapisane w ${documents.length} stronach; sitemap.xml, robots.txt i _redirects gotowe.`);
