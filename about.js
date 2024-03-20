// Developers:  Eden Laor - 208939629, Yarin Yahav - 


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
    id: 34534544,
    email: "tal@gmail.com"
  }
];

// GET request to get developers' information
router.get('/', (req, res) => {
  res.json(developers);
});

module.exports = router;
