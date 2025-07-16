// buildIndex.js
const fs       = require('fs');
const readline = require('readline');
const { Level } = require('level'); 

const ARTIST_FILE = '/Users/dhruvrauthan/Documents/Projects/chromesthesia/artist.jsonl';
const DB_PATH     = './artistGenresDB';

async function buildIndex() {
  const db = new Level(DB_PATH, { valueEncoding: 'json' });
  const fileStream = fs.createReadStream(ARTIST_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    count++;
    try {
      const obj = JSON.parse(line);
      const name   = obj.name.toLowerCase();
      const genres = (obj.genres || []).map(g => g.name);

      if (genres.length > 0) {
        await db.put(name, genres);
      }
    } catch (err) {
      console.error(`Parse error on line ${count}:`, err);
    }

    if (count % 100_000 === 0) {
      console.log(`Indexed ${count} artists…`);
    }
  }

  console.log(`Done! Indexed ${count} lines.`);
  await db.close();
}

buildIndex().catch(err => {
  console.error('Index build failed:', err);
  process.exit(1);
});
