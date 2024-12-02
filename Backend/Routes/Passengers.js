const express = require('express');
const router = express.Router();
const { Passenger, sequelize } = require('../models');  // Ensure sequelize is imported to use transactions

router.post('/', async (req, res) => {
  const passengers = req.body;
  console.log('Received passengers:', passengers);  // Log incoming data for debugging

  const t = await sequelize.transaction();  // Start a new transaction

  try {

    for (const passengerData of passengers) {
      await Passenger.create(passengerData, { transaction: t });  // Pass the transaction object here
    }

    await t.commit();  // Commit the transaction if all passengers are added successfully
    res.status(201).json({ message: 'Passengers added successfully!' });
  } catch (error) {
    await t.rollback();  // Rollback the transaction in case of an error
    console.error('Error adding passengers:', error);  // Log the error
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
