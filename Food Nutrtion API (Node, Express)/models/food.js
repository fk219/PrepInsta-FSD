// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for food and nutrition data
const foodSchema = new mongoose.Schema({
  foodItemName: { type: String, required: true },
  foodGroup: { type: String, required: true },
  description: { type: String },
  nutritionalInformation: {
    calories: { type: Number, required: true },
    macronutrients: {
      protein: { type: Number, required: true },
      fat: { type: Number, required: true },
      carbohydrates: { type: Number, required: true },
    },
    micronutrients: {
      vitamins: { type: String },
      minerals: { type: String },
    },
    fiber: { type: Number },
    sodium: { type: Number },
    cholesterol: { type: Number },
  },
  servingSize: { type: String, required: true },
  allergens: { type: [String] },
  ingredients: { type: String, required: true },
  preparationMethods: { type: String },
  certifications: { type: [String] },
  countryOfOrigin: { type: String },
  brandOrManufacturer: { type: String },
  dietaryRestrictions: { type: [String] },
  healthBenefits: { type: String },
  bestPractices: { type: String },
});

// Create a Mongoose model from the schema
const Food = mongoose.model('Food', foodSchema);

// Export the model
module.exports = Food;
