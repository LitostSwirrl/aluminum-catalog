import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('data/artworks.json', 'utf8'));

// Collect all unique URLs (sourceUrl + sources[].url)
const urlMap = new Map(); // url -> [{slug, field}]
data.forEach(a => {
  if (a.sourceUrl) {
    if (!urlMap.has(a.sourceUrl)) urlMap.set(a.sourceUrl, []);
    urlMap.get(a.sourceUrl).push({ slug: a.slug, field: 'sourceUrl' });
  }
  (a.sources || []).forEach((s, i) => {
    if (s.url) {
      if (!urlMap.has(s.url)) urlMap.set(s.url, []);
      urlMap.get(s.url).push({ slug: a.slug, field: `sources[${i}].url` });
    }
  });
});

console.log(`Checking ${urlMap.size} unique URLs across ${data.length} artworks...\n`);

const results = { ok: [], redirect: [], broken: [] };
const CONCURRENCY = 10;
const TIMEOUT = 10000;

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; link-checker)' }
    });
    clearTimeout(timer);
    return { url, status: res.status, ok: res.status >= 200 && res.status < 400 };
  } catch (e) {
    clearTimeout(timer);
    // Try GET if HEAD fails
    const controller2 = new AbortController();
    const timer2 = setTimeout(() => controller2.abort(), TIMEOUT);
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: controller2.signal,
        redirect: 'manual',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; link-checker)' }
      });
      clearTimeout(timer2);
      return { url, status: res.status, ok: res.status >= 200 && res.status < 400 };
    } catch (e2) {
      clearTimeout(timer2);
      return { url, status: 0, ok: false, error: e2.message };
    }
  }
}

async function processInBatches(urls, concurrency) {
  const urlList = [...urls];
  let i = 0;
  let checked = 0;

  async function next() {
    while (i < urlList.length) {
      const url = urlList[i++];
      const result = await checkUrl(url);
      checked++;

      const refs = urlMap.get(url);
      const refStr = refs.map(r => `${r.slug}:${r.field}`).join(', ');

      if (result.status >= 200 && result.status < 300) {
        results.ok.push({ ...result, refs });
        process.stdout.write(`  ✓ ${checked}/${urlList.length} [${result.status}] ${url.substring(0, 60)}\n`);
      } else if (result.status >= 300 && result.status < 400) {
        results.redirect.push({ ...result, refs });
        process.stdout.write(`  → ${checked}/${urlList.length} [${result.status}] ${url.substring(0, 60)}\n`);
      } else {
        results.broken.push({ ...result, refs });
        process.stdout.write(`  ✗ ${checked}/${urlList.length} [${result.status}] ${url.substring(0, 60)} (${refStr})\n`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => next());
  await Promise.all(workers);
}

await processInBatches(urlMap.keys(), CONCURRENCY);

console.log(`\n--- Summary ---`);
console.log(`OK (2xx):       ${results.ok.length}`);
console.log(`Redirect (3xx): ${results.redirect.length}`);
console.log(`Broken:         ${results.broken.length}`);

if (results.broken.length > 0) {
  console.log(`\nBroken URLs:`);
  results.broken.forEach(r => {
    const refs = r.refs.map(ref => `${ref.slug}:${ref.field}`).join(', ');
    console.log(`  [${r.status}] ${r.url}`);
    console.log(`         used by: ${refs}`);
    if (r.error) console.log(`         error: ${r.error}`);
  });
}

// Write full report
writeFileSync('scripts/url-report.json', JSON.stringify(results, null, 2));
console.log(`\nFull report: scripts/url-report.json`);
