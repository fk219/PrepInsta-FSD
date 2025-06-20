// Import Express and the Food model
const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// POST route for adding a new food item
router.post('/', async (req, res) => {
    try {
        // Log the incoming request body to the console
        console.log('Received POST request with data:', req.body);

        const { 
            foodItemName, 
            foodGroup, 
            servingSize, 
            ingredients, 
            nutritionalInformation, 
            description, 
            allergens, 
            preparationMethods, 
            certifications, 
            countryOfOrigin, 
            brandOrManufacturer, 
            dietaryRestrictions, 
            healthBenefits, 
            bestPractices 
        } = req.body;

        const newFood = new Food({ 
            foodItemName, 
            foodGroup, 
            servingSize, 
            ingredients, 
            nutritionalInformation, 
            description, 
            allergens, 
            preparationMethods, 
            certifications, 
            countryOfOrigin, 
            brandOrManufacturer, 
            dietaryRestrictions, 
            healthBenefits, 
            bestPractices 
        });

        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        console.error('Error while saving new food item:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to get all food items
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a specific food item by ID
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.json(food);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update a food item
router.put('/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.json(food);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a food item
router.delete('/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        res.json({ message: 'Food item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Export the router
module.exports = router;
