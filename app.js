// Developers:  Eden Laor - 208939629, Yarin Yahav - 

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const addCalories = require('./addcalories');
const about = require("./about");
const report = require("./report");

// Database Connection
const connectDB = require('./DB');
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/addcalories', addCalories);
app.use("/about", about);
app.use("/report", report);

// Default route
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`app listening on port ${port}!`));
