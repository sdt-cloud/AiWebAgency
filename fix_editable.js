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
  
  // Remove content={content} from EditableText and EditableImage
  content = content.replace(/content=\{content\}/g, '');
  
  // Remove contentKey="something" from EditableText and EditableImage
  content = content.replace(/contentKey=(['"]).*?\1/g, '');
  
  // Remove onUpdate={...} which is a mistake for onChange
  // Wait, if they used onUpdate instead of onChange, I should replace it
  content = content.replace(/onUpdate=\{/g, 'onChange={');

  fs.writeFileSync(file, content);
});

console.log('Cleaned up extra props');
