const fs = require('fs');
let code = fs.readFileSync('src/app/components/PoussetteTrio2Page.tsx', 'utf8');
code = code.replace(/    <\/div>\n  \);\n}\n?$/, '    </div>\n    </div>\n  );\n}\n');
fs.writeFileSync('src/app/components/PoussetteTrio2Page.tsx', code);
console.log("Replaced!");
