const mongoose = require('mongoose');

const calorieItemSchema = new mongoose.Schema({
    id: {
        type: Number
    },
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

// Set up middleware to generate the 'id' field
calorieItemSchema.pre('save', async function (next)
{
    const doc = this;
    try
    {
        const count = await mongoose.model('CalorieItem').countDocuments();
        doc.id = count + 1; // Increment the 'id' for each new document
        next();
    } catch (err)
    {
        next(err);
    }
});

const CalorieItem = mongoose.model('CalorieItem', calorieItemSchema, 'calories');

module.exports = CalorieItem;
