const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for recipe
const RecipeSchema = new Schema({
  recipeName: {
    type: String
  },
  foodCategory: {
    type: String
  },
  recipeDescription: {
    type: String
  },
  prepareTime: {
    type: String
  },
  cookTime: {
    type: String
  },
  ingredients : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient"
    }
  ]
});

//create model for recipe
const Recipe = mongoose.model("Recipe", RecipeSchema,"recipes");

module.exports = Recipe;