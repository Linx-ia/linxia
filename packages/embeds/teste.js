const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist', 'index.js');

fs.readFile(distPath, 'utf8', (err, data) => {
  if (err) throw err;

  let fixedData = data.replace('var jEe={initBubble:gme},TEe=jEe', 'var jEe={initBubble:gme},TEe=jEe;export{TEe as default}');
  fixedData = data.replace(';module.exports=zX(DEe)', '');

  fs.writeFile(distPath, fixedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('Exportação padrão corrigida no dist/index.js');
  });
});
