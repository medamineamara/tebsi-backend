const express = require('express');
const router = express.Router();
const authenticateJWT = require("./token.js");
const Ingredient = require('../models/ingredient.model');

router.get('/', (req, res) => {
    Ingredient.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Ingredient.findById(req.params.id)
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/',authenticateJWT, (req, res, next) => {
    const newIngredient = new Ingredient(req.body);
    newIngredient.save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id',authenticateJWT, (req, res, next) => {
    Ingredient.findById(req.params.id)
    .then(ingredient => {
        ingredient.ingredientName = req.body.ingredientName;

      ingredient.save()
        .then(() => res.json('ingredient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id',authenticateJWT, (req, res, next) => {
    Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json('ingredient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;