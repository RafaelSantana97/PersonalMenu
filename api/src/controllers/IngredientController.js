const ingredientService = require('../services/IngredientService')

module.exports = {
  getAllWithPersonalSelection: async (req, res) => {
    let ingredients = await ingredientService.getAllWithPersonalSelection()
    res.json({ error: '', result: ingredients })
  },

  addPersonalSelection: async (req, res) => {
    await ingredientService.addPersonalSelection(req.params.userId, req.params.tagId)
    res.json({ error: '' })
  },

  deletePersonalSelection: async (req, res) => {
    await ingredientService.deletePersonalSelection(req.params.userId, req.params.tagId)
    res.json({ error: '' })
  }
}