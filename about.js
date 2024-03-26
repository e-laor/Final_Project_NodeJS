// Developers:  Eden Laor - 208939629, Yarin Yahav - 207952516
// about.js


const express = require('express');
const router = express.Router();

// Array of developer objects
const developers = [
  {
    firstname: "Eden",
    lastname: "Laor",
    id: 208939629,
    email: "edenlaor1@hotmail.com"
  },
  {
    firstname: "Yarin",
    lastname: "Yahav",
    id: 207952516,
    email: "yarinyahav0@gmail.com"
  }
];

// GET request to get developers' information
router.get('/', (req, res) =>
{
  res.json(developers);
});

module.exports = router;
