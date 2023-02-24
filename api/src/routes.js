const express = require('express')
const router = express.Router()

const recipeController = require('./controllers/RecipeController')

router.get('/recipes', recipeController.getAll)

module.exports = router