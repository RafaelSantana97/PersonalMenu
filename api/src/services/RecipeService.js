const db = require('../db')

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT r.title, GROUP_CONCAT(DISTINCT ri.ingredient_description, '§') AS ingredients, 
        GROUP_CONCAT(DISTINCT rd.direction, '§') AS directions, r.link, GROUP_CONCAT(DISTINCT it.name, '§') AS tags 
        FROM recipes r
        JOIN recipe_ingredients ri ON ri.recipe_id = r.id
        JOIN recipe_directions rd ON rd.recipe_id = r.id
        JOIN recipe_ingredient_tags rit ON rit.recipe_id = r.id
        JOIN ingredient_tags it ON rit.ingredient_tag_id = it.id
        GROUP BY r.id, r.title, r.link;
      `, (error, rows) => {
        if (error) {
          reject(error);
          return;
        }

        const recipes = rows.map(recipe => {
          recipe.tags = recipe.tags.split('§,')
          recipe.ingredients = recipe.ingredients.split('§,')
          recipe.directions = recipe.directions.split('§,')

          return recipe;
        }, []);

        console.log(recipes);
        resolve(recipes)
      })
    })
  }
};