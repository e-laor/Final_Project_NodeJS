// Developers:  Eden Laor - 208939629, Yarin Yahav - 207952516

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
app.get('/', (req, res) =>
{
    const htmlContent = `
      <h3>Welcome to our final Final Project in NodeJS</h3>
      <p>to use the API, use:</p>
      <ul>
        <li>/addcalories - (POST)</li>
        <li>/report?user_id=INSERT_USER_ID&year=INSERT_YEAR&month=INSERT_MONTH - (GET)</li>
        <li>/about - (GET)</li>
      </ul>
    `;

    res.send(htmlContent);
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
