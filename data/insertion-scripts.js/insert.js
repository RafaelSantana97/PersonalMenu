const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'dbMenu'
});

connection.connect();

const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('data/dataset/full_dataset.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Inserir na tabela 'recipes'
    connection.query('INSERT INTO recipes (title, link) VALUES (?, ?)', [row.title, row.link], (error, r_results) => {
      if (error) throw error;

      const recipeId = r_results.insertId;

      // Inserir na tabela 'recipe_directions'
      const directions = JSON.parse(row.directions);
      let query_rd = 'INSERT INTO recipe_directions (recipe_id, direction) VALUES'
      let values_rd = []
      for (let i = 0; i < directions.length; i++) {
        values_rd.push(recipeId, directions[i])
        query_rd += '(?, ?),'
      }
      connection.query(query_rd.slice(0, -1), values_rd, (error) => {
        if (error) throw error;
      });


      // Inserir na tabela 'recipe_ingredients'
      const ingredients = JSON.parse(row.ingredients);
      let query_ri = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_description) VALUES'
      let values_ri = []
      for (let i = 0; i < ingredients.length; i++) {
        values_ri.push(recipeId, ingredients[i])
        query_ri += '(?, ?),'
      }

      values_ri.length > 0 && connection.query(query_ri.slice(0, -1), values_ri, (error) => {
        if (error) throw error;
      });

      // Inserir na tabela 'ingredient_tags' e 'recipe_ingredient_tags'
      const ingredientTags = JSON.parse(row.ingredient_tags);
      for (let i = 0; i < ingredientTags.length; i++) {
        const insertIngredientTag = new Promise((resolve, reject) => {
          connection.query('INSERT INTO ingredient_tags (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)', [ingredientTags[i]], (error, i_results) => {
            if (error) reject(error);
            resolve(i_results.insertId);
          });
        });

        insertIngredientTag.then((ingredientTagId) => {
          console.log(ingredientTagId)
          connection.query('INSERT INTO recipe_ingredient_tags (recipe_id, ingredient_tag_id) VALUES (?, ?)', [recipeId, ingredientTagId], (error) => {
            if (error) throw error;
          });
        }).catch((error) => {
          throw error;
        });
      }
    });
  })
  .on('end', () => {
    console.log('Inserção concluída');
    connection.end();
  });
