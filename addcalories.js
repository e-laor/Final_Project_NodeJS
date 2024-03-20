// Developers:  Eden Laor - 208939629, Yarin Yahav - 207952516


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import the CalorieItem model
const calorieItem = require('./models/CalorieItem');

// Middleware to parse JSON bodies
router.use(express.json());

// POST request to add a new calorie consumption item
router.post('/', async (req, res) =>
{
    const { user_id, year, month, day, description, category, amount } = req.body;

    // Check if all required parameters are provided
    if (!user_id || !year || !month || !day || !description || !category || !amount)
    {
        return res.status(400).json({ error: "All parameters are required" });
    }

    try
    {
        // Check if the user exists in the database
        const user = await findUserById(user_id);

        if (!user)
        {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new calorieItem object (based on the model)
        const newCalorieItem = new calorieItem({
            user_id: parseInt(user_id),
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day),
            description,
            category,
            amount: parseInt(amount)
        });

        // Save the new calorie consumption item to the database
        await newCalorieItem.save();

        res.json({ message: "Calorie consumption item added successfully" });
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Function to find user by ID
function findUserById(user_id)
{
    return new Promise((resolve, reject) =>
    {
        mongoose.connection.collection('users').findOne({ id: parseInt(user_id) }, (err, user) =>
        {
            if (err)
            {
                reject(err);
            } else
            {
                resolve(user);
            }
        });
    });
}

module.exports = router;
