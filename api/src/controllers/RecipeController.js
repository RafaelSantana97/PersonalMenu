const recipeService = require('../services/RecipeService')

module.exports = {
  getAll: async (req, res) => {
    let recipes = await recipeService.getAll()
    res.json({ error: '', result: recipes })
  }
}