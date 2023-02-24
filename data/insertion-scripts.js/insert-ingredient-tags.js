const fs = require('fs');
const csv = require('csv-parser');

const ingredientTags = new Set();

fs.createReadStream('data/dataset/full_dataset.csv')
  .pipe(csv())
  .on('data', (row) => {
    const tags = JSON.parse(row.ingredient_tags);
    tags.forEach(tag => ingredientTags.add(tag.toLowerCase()));
  })
  .on('end', () => {
    fs.writeFileSync('data/generated/distinct-ingredient-tags.txt', Array.from(ingredientTags).sort().join('\n'));
    console.log('Todos os ingredient_tags foram salvos no arquivo externo.');
  });
