const db = require('../db')

module.exports = {
  getAllWithPersonalSelection: () => {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT id, ingredient, owned
        FROM (
          SELECT
            COUNT(*), 
            rit.ingredient_tag_id AS id,
            it.name AS ingredient,
            CASE WHEN uit.ingredient_tag_id is null THEN 0 ELSE 1 END AS owned
          FROM recipe_ingredient_tags rit
          JOIN ingredient_tags it ON rit.ingredient_tag_id = it.id
          LEFT JOIN user_ingredient_tags uit ON uit.ingredient_tag_id = it.id
          GROUP BY rit.ingredient_tag_id, uit.ingredient_tag_id
          ORDER BY 1 desc
          LIMIT 500
        ) ingr;
      `, (error, rows) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(rows)
      })
    })
  },
  
  addPersonalSelection: (userId, tagId) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT IGNORE INTO user_ingredient_tags (user_id, ingredient_tag_id) VALUES (?, ?)', [userId, tagId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results.insertId)
      })
    })
  },
  
  deletePersonalSelection: (userId, tagId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM user_ingredient_tags WHERE user_id = ? AND ingredient_tag_id = ?', [userId, tagId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results.insertId)
      })
    })
  }
};