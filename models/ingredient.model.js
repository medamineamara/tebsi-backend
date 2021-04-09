const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Ingredient
const IngredientSchema = new Schema({
  ingredientName: {
    type: String
  }
});

//create model for Ingredient
const Ingredient = mongoose.model("Ingredient", IngredientSchema,"ingredients");

module.exports = Ingredient;