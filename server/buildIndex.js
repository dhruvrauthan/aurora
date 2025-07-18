// // buildIndex.js
// const fs       = require('fs');
// const readline = require('readline');
// const { Level } = require('level'); 

// const ARTIST_FILE = '/Users/dhruvrauthan/Documents/Projects/chromesthesia/artist.jsonl';
// const DB_PATH     = './artistGenresDB';

// async function buildIndex() {
//   const db = new Level(DB_PATH, { valueEncoding: 'json' });
//   const fileStream = fs.createReadStream(ARTIST_FILE);
//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });

//   let count = 0;
//   for await (const line of rl) {
//     count++;
//     try {
//       const obj = JSON.parse(line);
//       const name   = obj.name.toLowerCase();
//       const genres = (obj.genres || []).map(g => g.name);

//       if (genres.length > 0) {
//         await db.put(name, genres);
//       }
//     } catch (err) {
//       console.error(`Parse error on line ${count}:`, err);
//     }

//     if (count % 100_000 === 0) {
//       console.log(`Indexed ${count} artists…`);
//     }
//   }

//   console.log(`Done! Indexed ${count} lines.`);
//   await db.close();
// }

// buildIndex().catch(err => {
//   console.error('Index build failed:', err);
//   process.exit(1);
// });

// exportGenres.js
const fs = require('fs');
const { Level } = require('level');

async function exportGenres() {
  // open the same DB we built
  const db = new Level('./artistGenresDB', { valueEncoding: 'json' });

  const seen = new Set();
  for await (const [artist, genres] of db.iterator()) {
    for (const g of genres) seen.add(g);
  }

  // write CSV
  const out = fs.createWriteStream('unique_genres.csv');
  out.write('Genre\n');
  for (const genre of Array.from(seen).sort()) {
    out.write(genre.replace(/"/g, '""') + '\n');
  }
  out.end(() => console.log('✅ unique_genres.csv generated'));

  await db.close();
}

exportGenres().catch(err => {
  console.error(err);
  process.exit(1);
});
