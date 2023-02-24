const express = require('express')
const router = express.Router()

const recipeController = require('./controllers/RecipeController')
const ingredientController = require('./controllers/IngredientController')

router.get('/recipes', recipeController.getAll)

router.get('/ingredients/with-personal-selection', ingredientController.getAllWithPersonalSelection)
router.put('/ingredients/add-personal-selection/:userId/:tagId', ingredientController.addPersonalSelection)
router.delete('/ingredients/delete-personal-selection/:userId/:tagId', ingredientController.deletePersonalSelection)

module.exports = router