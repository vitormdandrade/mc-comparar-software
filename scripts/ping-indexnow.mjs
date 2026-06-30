#!/usr/bin/env node
/**
 * Ping IndexNow with all URLs from this site's sitemap.
 * See orcazap-mvp/scripts/ping-indexnow.mjs for full protocol notes.
 *
 * Run after every deploy:
 *   npm run indexnow
 */

const HOST = 'compararsaas.com.br';
const KEY = 'e555f98ec7c14dcb99ccb9c3eae4ea4d';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  console.log(`[indexnow] Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => u.startsWith(`https://${HOST}`));

  if (urlList.length === 0) {
    console.error('[indexnow] No URLs found in sitemap.');
    process.exit(1);
  }
  console.log(`[indexnow] Found ${urlList.length} URLs. Pinging IndexNow...`);

  const pingRes = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  console.log(`[indexnow] Response: ${pingRes.status} ${pingRes.statusText}`);
  if (pingRes.status === 200 || pingRes.status === 202) {
    console.log(`[indexnow] ✅ Successfully pinged ${urlList.length} URLs.`);
  } else {
    console.error(`[indexnow] ❌ Non-success:`, await pingRes.text());
    process.exit(1);
  }
}
main().catch((err) => { console.error('[indexnow] Error:', err); process.exit(1); });
