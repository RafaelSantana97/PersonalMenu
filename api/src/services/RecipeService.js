const db = require('../db')

const mapRecipes = (rows) => {
  return rows.map(recipe => {
    recipe.tags = recipe.tags.slice(0, -1).split('§,')
    recipe.ingredients = recipe.ingredients.slice(0, -1).split('§,')
    recipe.directions = recipe.directions.slice(0, -1).split('§,')

    return recipe;
  }, [])
}

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
        GROUP BY r.id, r.title, r.link
        LIMIT 50;
      `, (error, rows) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(mapRecipes(rows))
      })
    })
  },

  getPersonalizedRecipes: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(`
          WITH pRecipes AS (
            SELECT recipe_id, COUNT(DISTINCT rit.ingredient_tag_id) AS matches
            FROM recipe_ingredient_tags rit
            JOIN user_ingredient_tags uit ON rit.ingredient_tag_id = uit.ingredient_tag_id
            WHERE user_id = 1
            GROUP BY recipe_id
            HAVING matches = (
              SELECT COUNT(DISTINCT ingredient_tag_id)
              FROM recipe_ingredient_tags srit
              WHERE rit.recipe_id = srit.recipe_id
            )
          )
          SELECT r.title, GROUP_CONCAT(DISTINCT ri.ingredient_description, '§') AS ingredients, 
          GROUP_CONCAT(DISTINCT rd.direction, '§') AS directions, r.link, GROUP_CONCAT(DISTINCT it.name, '§') AS tags 
          FROM recipes r
          JOIN recipe_ingredients ri ON ri.recipe_id = r.id
          JOIN recipe_directions rd ON rd.recipe_id = r.id
          JOIN recipe_ingredient_tags rit ON rit.recipe_id = r.id
          JOIN pRecipes pr ON pr.recipe_id = r.id
          JOIN ingredient_tags it ON rit.ingredient_tag_id = it.id
          GROUP BY r.id, r.title, r.link;
      `, [userId], (error, rows) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(mapRecipes(rows))
      })
    })
  }
};