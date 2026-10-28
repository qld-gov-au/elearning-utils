const fs = require('node:fs');
const path = require('node:path');

const modulesDirectory = path.resolve(__dirname, '..', 'modules');
const manifestPath = path.join(modulesDirectory, 'modules.json');

function formatTitle(name) {
  return path.basename(name, path.extname(name))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase());
}

fs.mkdirSync(modulesDirectory, { recursive: true });

const modules = fs.readdirSync(modulesDirectory, { withFileTypes: true })
  .flatMap(entry => {
    if (entry.isDirectory() && fs.existsSync(path.join(modulesDirectory, entry.name, 'index.html'))) {
      return [{ title: formatTitle(entry.name), path: `${entry.name}/index.html` }];
    }

    if (entry.isFile() && /\.html$/i.test(entry.name) && entry.name.toLowerCase() !== 'index.html') {
      return [{ title: formatTitle(entry.name), path: entry.name }];
    }

    return [];
  })
  .sort((first, second) => first.title.localeCompare(second.title));

fs.writeFileSync(manifestPath, `${JSON.stringify(modules, null, 2)}\n`);
console.log(`Generated ${manifestPath} with ${modules.length} module(s).`);