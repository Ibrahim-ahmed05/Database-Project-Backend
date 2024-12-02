const express = require('express');
const router = express.Router();
const { Flight } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {  // Ensure the route path matches frontend
  const {flightNumber} = req.query;
  if (!flightNumber) {
    return res.status(400).json({ message: 'Kindly Enter the Flight Number' });
  }
  try {
    console.log('Searching for flights:', {flightNumber});
    // console.log(typeof(source));
    const flights = await Flight.findAll({
      where: {
        flightNumber:flightNumber
      }
    });
    console.log(flights) ;

    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flights found! Kindly Enter the correct Flight Number.' });
    }

    res.status(200).json(flights);  // Send only matched flights
  } catch (error) {
    console.error('Error fetching flights:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

module.exports = router;
