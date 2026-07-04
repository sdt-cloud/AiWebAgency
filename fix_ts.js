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
  
  // Fix imports
  content = content.replace(/import\s*\{\s*EditableText\s*\}\s*from\s*['"](\.\.\/\.\.\/EditableText|.*?EditableText)['"];?/g, "import EditableText from '../../EditableText';");
  content = content.replace(/import\s*\{\s*EditableImage\s*\}\s*from\s*['"](\.\.\/\.\.\/EditableImage|.*?EditableImage)['"];?/g, "import EditableImage from '../../EditableImage';");
  
  // Fix generic import errors that might use wrong path
  content = content.replace(/import\s*EditableText\s*from\s*['"]\.\.\/EditableText['"];?/g, "import EditableText from '../../EditableText';");
  content = content.replace(/import\s*EditableImage\s*from\s*['"]\.\.\/EditableImage['"];?/g, "import EditableImage from '../../EditableImage';");
  
  // Fix parameter types
  content = content.replace(/\(val\)\s*=>/g, "(val: string) =>");
  content = content.replace(/\(value\)\s*=>/g, "(value: string) =>");
  content = content.replace(/\(val,\s*index\)\s*=>/g, "(val: string, index: number) =>");
  content = content.replace(/\(item,\s*index\)\s*=>/g, "(item: any, index: number) =>");
  content = content.replace(/\(member,\s*index\)\s*=>/g, "(member: any, index: number) =>");
  content = content.replace(/\(service,\s*index\)\s*=>/g, "(service: any, index: number) =>");
  content = content.replace(/\(testimonial,\s*index\)\s*=>/g, "(testimonial: any, index: number) =>");
  content = content.replace(/\(category,\s*index\)\s*=>/g, "(category: any, index: number) =>");
  content = content.replace(/\(image,\s*index\)\s*=>/g, "(image: any, index: number) =>");
  
  fs.writeFileSync(file, content);
});

console.log('Fixed TS errors in layouts');
