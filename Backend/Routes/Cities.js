const express = require('express');
const cors = require('cors'); // Import CORS module
const { Flight } = require('../models'); // Ensure the path is correct

const router = express.Router();
router.use(cors());

router.get('/', async (req, res) => {
  try {
    const cities = await Flight.findAll({
      attributes: ['source', 'destination'],
    });

    const citySet = new Set();
    cities.forEach(flight => {
      if (flight.source) citySet.add(flight.source.trim());
      if (flight.destination) citySet.add(flight.destination.trim());
    });

    res.status(200).json([...citySet]);
  } catch (error) {
    console.error('Error fetching cities:', error.message);
    res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
});

module.exports = router;
