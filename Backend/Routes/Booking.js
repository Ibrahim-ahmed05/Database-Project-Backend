const express = require('express');
const router = express.Router();
const { Booking, Flights,Passengers,sequelize } = require('../models');  // Ensure `sequelize` is imported

router.post("/", async (req, res) => {
  const { bookings } = req.body;
  const transaction = await sequelize.transaction();

  try {
    await Booking.bulkCreate(bookings, { transaction });
    await transaction.commit();
    res.status(201).json({ message: 'All bookings saved successfully!' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error saving bookings:', error);
    res.status(500).json({ error: 'Failed to save bookings.' });
  }
});
router.get("/", async (req, res) => {
  const { email } = req.query;  // Extract email from query parameters

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const userBookings = await Booking.findAll({
      where: { email },  // Filter bookings by email
      include: [
        {
          model: Flights, 
          as: 'flight',    
          attributes: ['flightNumber', 'source', 'destination', 'departureTime', 'arrivalTime', 'price'] // Required flight attributes
        },
        {
          model: Passengers,
          as: 'passenger',  
          attributes: ['PassportNumber']
        }
      ],
    });

    if (userBookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this email.' });
    }

    res.status(200).json(userBookings);  // Return the list of bookings with flight and passenger details
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
});
module.exports = router;
