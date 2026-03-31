const fs = require('fs');

const code = fs.readFileSync('src/app/components/PoussetteTrio2Page.tsx', 'utf8');

// Strip comments and strings to make parsing easier (simple heuristic)
let cleanCode = code.replace(/\/\/.*$/gm, '')
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/'[^']*'/g, "''")
                    .replace(/"[^"]*"/g, '""')
                    .replace(/`[^`]*`/g, "``");

let divOpen = (cleanCode.match(/<div(\s|>)/g) || []).length;
let divClose = (cleanCode.match(/<\/div>/g) || []).length;

console.log(`divOpen: ${divOpen}, divClose: ${divClose}, difference: ${divOpen - divClose}`);

// Also count other common tags
let tags = ['span', 'p', 'button', 'a', 'ul', 'li', 'h1', 'h2', 'h3'];
for (let tag of tags) {
  let open = (cleanCode.match(new RegExp(`<${tag}(\\s|>)`, 'g')) || []).length;
  let close = (cleanCode.match(new RegExp(`</${tag}>`, 'g')) || []).length;
  if (open !== close) {
    console.log(`Tag ${tag} difference: ${open - close} (open: ${open}, close: ${close})`);
  }
}
