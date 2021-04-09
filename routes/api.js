const express = require ('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

//recipe CRUD
const recipeRoutes = require("./recipe.js");
router.use('/recipe',recipeRoutes);

//ingredient CRUD
const ingredientRoutes = require("./ingredient.js");
router.use('/ingredient',ingredientRoutes);

//admin login
const auth = require("./auth.js");
router.use('/admin',auth);

module.exports = router;