const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/components/templates/layouts/');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/onImageChange=/g, "onChange=");
  fs.writeFileSync(file, content);
});

console.log('Fixed onImageChange to onChange');
