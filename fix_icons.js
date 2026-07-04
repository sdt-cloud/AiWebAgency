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
  
  // Replace Instagram and Facebook imports and JSX tags with Globe
  content = content.replace(/\bInstagram\b/g, 'Globe');
  content = content.replace(/\bFacebook\b/g, 'Globe');
  
  fs.writeFileSync(file, content);
});
console.log('Fixed Lucide icons');
