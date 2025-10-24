const fs = require('fs-extra');
const path = require('node:path');

const SRC = path.join(__dirname, '..', 'src', 'readings');
const DEST = path.join(__dirname, '..', 'dist', 'readings');

fs.copySync(SRC, DEST, {
  filter: (src) => src.includes(`${path.sep}assets${path.sep}`)
});

console.log('✅ Copied assets → dist/readings/**/assets');