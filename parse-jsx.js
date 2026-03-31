const fs = require('fs');
const jsx = fs.readFileSync('src/app/components/PoussetteTrio2Page.tsx', 'utf8');

let lines = jsx.split('\n');
let stack = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Very simplistic parsing, looking for <tag, </tag>
  // Ignoring strings and self-closing for a moment
  let openRegex = /<([a-zA-Z][a-zA-Z0-9]*)[^>]*?(?<!\/)>/g;
  let closeRegex = /<\/([a-zA-Z][a-zA-Z0-9]*)>/g;
  
  // remove string literals
  let cleanLine = line.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''").replace(/`[^`]*`/g, "``");
  // remove comments
  cleanLine = cleanLine.replace(/\/\/.*$/, '');
  
  let match;
  while ((match = openRegex.exec(cleanLine)) !== null) {
    stack.push({ tag: match[1], line: i + 1 });
  }
  
  while ((match = closeRegex.exec(cleanLine)) !== null) {
    let tag = match[1];
    let top = stack.pop();
    if (top && top.tag !== tag) {
      console.log(`Mismatch at line ${i + 1}: Expected </${top.tag}> (from line ${top.line}), found </${tag}>`);
      // push it back to try to recover
      stack.push(top);
      // Actually let's not recover intelligently, just log
    }
  }
}

console.log("Remaining in stack:");
console.log(stack.map(s => `${s.tag} at line ${s.line}`));
