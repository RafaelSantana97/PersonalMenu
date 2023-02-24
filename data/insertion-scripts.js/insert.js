const mysql = require('mysql')
const csv = require('csv-parser')
const fs = require('fs')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'dbMenu'
})

const connect = () => {
  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const insertIngredientTag = (ingredientTag) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ingredient_tags (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)'
    const values = [ingredientTag]

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.insertId)
      }
    })
  })
}

const insertRecipe = async (row) => {
  // Inserir na tabela 'recipes'
  const recipeResult = await query('INSERT INTO recipes (title, link) VALUES (?, ?)', [row.title, row.link])
  const recipeId = recipeResult.insertId

  // Inserir na tabela 'recipe_directions'
  const directions = JSON.parse(row.directions)
  const directionValues = directions.map((direction) => [recipeId, direction])
  const directionQuery = 'INSERT INTO recipe_directions (recipe_id, direction) VALUES ?'
  await query(directionQuery, [directionValues])

  // Inserir na tabela 'recipe_ingredients'
  const ingredients = JSON.parse(row.ingredients)
  const ingredientValues = ingredients.map((ingredient) => [recipeId, ingredient])
  const ingredientQuery = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_description) VALUES ?'
  await query(ingredientQuery, [ingredientValues])

  // Inserir na tabela 'ingredient_tags' e 'recipe_ingredient_tags'
  const ingredientTags = JSON.parse(row.ingredient_tags)
  for (let i = 0; i < ingredientTags.length; i++) {
    const ingredientTagId = await insertIngredientTag(ingredientTags[i])
    await query('INSERT INTO recipe_ingredient_tags (recipe_id, ingredient_tag_id) VALUES (?, ?)', [recipeId, ingredientTagId])
  }
}

const main = async () => {
  try {
    await connect()

    const stream = fs.createReadStream('data/dataset/full_dataset.csv').pipe(csv())

    for await (const row of stream) {
      await insertRecipe(row)
    }

    console.log('Inserção concluída')
    connection.end()
  } catch (error) {
    console.error(error)
    connection.end()
  }
}

main()
