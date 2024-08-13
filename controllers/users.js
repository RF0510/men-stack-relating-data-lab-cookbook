// controllers/users.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Route to display all users
router.get('/', async (req, res) => {
    const username = req.session.user.username;
    const allUsers = await User.find({});
    res.render('users/index.ejs', {
        allUsers
    });
});

// Route to display a specific user's pantry
router.get('/:userId', async (req, res) => {
    const username = req.session.user.username;
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.render('users/show.ejs', {
        pantry: user.pantry
    });
});

module.exports = router;
