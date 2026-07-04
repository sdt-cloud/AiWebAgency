const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/templates/IndexRenderer.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove .catch(() => Placeholder)
content = content.replace(/\.catch\(\(\) => Placeholder\)/g, '');

// Fix ElectricianProTemplate path
content = content.replace(/\.\/layouts\/service\/ElectricianProTemplate/g, './layouts/emergency/ElectricianProTemplate');

fs.writeFileSync(filePath, content);
console.log('Fixed IndexRenderer.tsx');
