const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import the CalorieItem model
const calorieItem = require('./models/CalorieItem');

// Middleware to parse JSON bodies
router.use(express.json());


// Validate Year, Month, and Day Functions
function isValidDate(year, month, day) {

    const currentYear = new Date().getFullYear();

    // Check if year is within the valid range
    if (year < 2020 || year > currentYear) {
        return false;
    }

    // JavaScript counts months from 0 to 11, so we subtract 1 from the provided month
    const date = new Date(year, month - 1, day);
    // Check if the resulting date is valid
    return (
        date.getFullYear() === parseInt(year, 10) &&
        date.getMonth() + 1 === parseInt(month, 10) &&
        date.getDate() === parseInt(day, 10)
    );
}

// POST request to add a new calorie consumption item
router.post('/', async (req, res) =>
{
    const { user_id, year, month, day, description, category, amount } = req.body;

    // Check if all required parameters are provided
    if (!user_id || !description || !category || !amount)
    {
        return res.status(400).json({ error: "User ID, description, category, and amount are required" });
    }

    // Check if date was provided or not
    if ((year && !month) || (year && !day) || (month && !year) || (month && !day) || (day && !year) || (day && !month))
    {
        return res.status(400).json({ error: "Can't provide 'half' date. Please either provide full date (day, month and year) or none to use today's date." });
    }

    // Validate Year, Month, and Day (if provided)
    if (year && month && day && !isValidDate(year, month, day)) {
        return res.status(400).json({ error: "Invalid date. Please provide a valid date." });
    }
    
    // Validate amount
    if (isNaN(amount) || amount < 0 || amount >= 10000) {
        return res.status(400).json({ error: "Amount must be a non-negative number less than 10,000" });
    }
    
    // Set default values for year, month, and day if not provided
    const currentDate = new Date();
    const currentYear = year || currentDate.getFullYear();
    const currentMonth = month || currentDate.getMonth() + 1;
    const currentDay = day || currentDate.getDate();



    try
    {
        // Check if the user exists in the database
        const user = await findUserById(user_id);

        if (!user)
        {
            return res.status(404).json({ error: "User not found" });
        }

         // Check if the provided category is in the available categories from the schema
        const validCategory = calorieItem.schema.path('category').enumValues.includes(category) ? category : 'other';


        // Create a new calorieItem object (based on the model)
        const newCalorieItem = new calorieItem({
            user_id: parseInt(user_id),
            year: parseInt(currentYear),
            month: parseInt(currentMonth),
            day: parseInt(currentDay),
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
