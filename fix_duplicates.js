const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/components/templates/layouts/');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find import { ... } from 'lucide-react';
  const lucideRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
  
  content = content.replace(lucideRegex, (match, importsStr) => {
    // Split by comma, trim, filter out empty strings, and remove duplicates
    const imports = importsStr.split(',').map(s => s.trim()).filter(s => s);
    const uniqueImports = [...new Set(imports)];
    return `import { ${uniqueImports.join(', ')} } from 'lucide-react';`;
  });
  
  fs.writeFileSync(file, content);
});
console.log('Deduplicated imports');
