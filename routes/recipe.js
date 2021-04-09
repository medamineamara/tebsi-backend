const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.model');
const asyncHandler = require('express-async-handler');
const authenticateJWT = require("./token.js");

router.get('/', (req, res) => {
    Recipe.find().populate("ingredients")
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id).populate("ingredients")
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/',authenticateJWT, (req, res, next) => {
    const newRecipe = new Recipe(req.body);
    newRecipe.save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id',authenticateJWT, (req, res, next) => {
    Recipe.findById(req.params.id)
    .then(recipe => {
        recipe.recipeName = req.body.recipeName;
        recipe.foodCategory = req.body.foodCategory;
        recipe.recipeDescription = req.body.recipeDescription;
        recipe.prepareTime = req.body.prepareTime;
        recipe.cookTime = req.body.cookTime;

      recipe.save()
        .then(() => res.json('Recipe updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id',authenticateJWT, (req, res, next) => {
    console.log(req.params.id);
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adding ingredient

router.post('/:idrecipe/addingredient/:idingredient',authenticateJWT, (req, res, next) => {
    Recipe.findByIdAndUpdate(
        req.params.idrecipe,
        { $push: { ingredients: req.params.idingredient } },
        { new: true, useFindAndModify: false }
      )
    .then(() => res.json("ingredient added"))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;