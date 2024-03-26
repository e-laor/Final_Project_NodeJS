// Developers:  Eden Laor - 208939629, Yarin Yahav - 207952516
// models/CalorieItem.js


const mongoose = require('mongoose');


// the schema for an item to add using addCalories
const calorieItemSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'other'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const CalorieItem = mongoose.model('CalorieItem', calorieItemSchema, 'calories');

module.exports = CalorieItem;
