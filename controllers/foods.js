// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Route to display all foods in the user's pantry
router.get('/', async (req, res) => {
    const username = req.session.user.username;
    const user = await User.findOne({ username });

    res.render('foods/index.ejs', {
        pantry: user.pantry
    });
});

// Route to show the form to add a new food item
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

// Route to add a new food item to the user's pantry
router.post('/', async (req, res) => {
    const username = req.session.user.username;
    const user = await User.findOne({ username });

    user.pantry.push(req.body);
    await user.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
});

// Route to delete a food item from the user's pantry
router.delete('/:itemId', async (req, res) => {
    const username = req.session.user.username;
    const itemId = req.params.itemId;

    const user = await User.findOne({ username });

    user.pantry = user.pantry.filter(item => item._id.toString() !== itemId);
    await user.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
});

// Route to show the form to edit a food item
router.get('/:itemId/edit', async (req, res) => {
    const username = req.session.user.username;
    const foodId = req.params.itemId;

    const user = await User.findOne({ username });
    const food = user.pantry.find(food => food._id.toString() === foodId);

    res.render('foods/edit.ejs', {
        foodToEdit: food
    });
});

// Route to update a food item in the user's pantry
router.put('/:itemId', async (req, res) => {
    const username = req.session.user.username;
    const foodId = req.params.itemId;

    const user = await User.findOne({ username });
    const food = user.pantry.id(foodId);

    food.set({
        foodName: req.body.foodName,
    });

    await user.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
});

module.exports = router;
