const fs = require('fs');
const path = require('path');

const dir = 'src/components/templates/layouts/service/';
const list = fs.readdirSync(dir);
list.forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/export function/g, 'export default function');
    fs.writeFileSync(fullPath, content);
  }
});

console.log('Fixed export default');
