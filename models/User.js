// Developers:  Eden Laor - 208939629, Yarin Yahav - 207952516
// models/User.js

const mongoose = require('mongoose');


//Schema for creating a user in the database
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;