const express = require('express');
const router = express.Router();
const { Flight } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {  // Ensure the route path matches frontend
  const { source, destination } = req.query;
  if (!source || !destination) {
    return res.status(400).json({ message: 'Source and destination are required.' });
  }
  try {
    console.log('Searching for flights:', { source, destination });
    // console.log(typeof(source));
    const flights = await Flight.findAll({
      where: {
        source:source,
        destination:destination,
      }
    });
    console.log(flights) ;

    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flights found for the selected route.' });
    }

    res.status(200).json(flights);  // Send only matched flights
  } catch (error) {
    console.error('Error fetching flights:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

module.exports = router;
