const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/templates/template-registry.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/template_name:\s*'([^']+)',([\s\S]*?)sections:\s*\[.*?\],/g, (match, tplName, between) => {
  const camelCaseName = tplName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Template';
  return `template_name: '${tplName}',${between}layoutComponent: '${camelCaseName}',`;
});

fs.writeFileSync(filePath, content);
console.log('Registry updated with layoutComponents!');
