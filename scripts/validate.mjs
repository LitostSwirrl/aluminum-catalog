import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('data/artworks.json', 'utf8'));

// Category distribution
const cats = {};
data.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
console.log('Category distribution:');
Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// Featured count
const featured = data.filter(a => a.featured).length;
console.log(`\nFeatured: ${featured}`);

// Connection count
const totalConns = data.reduce((s, a) => s + a.connections.length, 0);
console.log(`Total connections: ${totalConns}`);

// Source count
const totalSources = data.reduce((s, a) => s + a.sources.length, 0);
console.log(`Total sources: ${totalSources}`);

// Check all connections reference valid slugs
const slugSet = new Set(data.map(a => a.slug));
let invalidConns = 0;
let invalidList = [];
data.forEach(a => {
  a.connections.forEach(c => {
    if (!slugSet.has(c.targetSlug)) {
      invalidConns++;
      invalidList.push(`  ${a.slug} -> ${c.targetSlug}`);
    }
  });
});
console.log(`\nInvalid connection targets: ${invalidConns}`);
if (invalidList.length > 0) console.log(invalidList.join('\n'));

// Check description word counts
let shortDescs = 0, longDescs = 0;
data.forEach(a => {
  const words = a.description.split(/\s+/).length;
  if (words < 140) { shortDescs++; console.log(`  SHORT (${words}w): ${a.slug}`); }
  if (words > 220) { longDescs++; console.log(`  LONG (${words}w): ${a.slug}`); }
});
console.log(`\nShort descriptions (<140w): ${shortDescs}`);
console.log(`Long descriptions (>220w): ${longDescs}`);
