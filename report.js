// Developers:  Eden Laor - 208939629, Yarin Yahav - 


const express = require('express');
const router = express.Router();
const CalorieItem = require('./models/CalorieItem');

// GET request to get detailed report
router.get('/', async (req, res) => {
  const { user_id, month, year } = req.query;

  // Check if all required parameters are provided
  if (!user_id || !month || !year) {
    return res.status(400).json({ error: "User ID, month, and year are required" });
  }

  try {
    // Find all calorie items for the specified user, month, and year
    const calorieItems = await CalorieItem.find({
      user_id: parseInt(user_id),
      month: parseInt(month),
      year: parseInt(year)
    });

    // Create the report object
    const report = {
      breakfast: [],
      lunch: [],
      dinner: [],
      other: []
    };

    // Populate the report with the fetched calorie items
    calorieItems.forEach(item => {
      switch (item.category) {
        case "breakfast":
          report.breakfast.push({
            day: item.day,
            description: item.description,
            amount: item.amount
          });
          break;
        case "lunch":
          report.lunch.push({
            day: item.day,
            description: item.description,
            amount: item.amount
          });
          break;
        case "dinner":
          report.dinner.push({
            day: item.day,
            description: item.description,
            amount: item.amount
          });
          break;
        case "other":
          report.other.push({
            day: item.day,
            description: item.description,
            amount: item.amount
          });
          break;
        default:
          break;
      }
    });

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
