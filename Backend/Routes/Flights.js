const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the fs module
const { Flight } = require('../models');
const router = express.Router();

// const loadFlights = async () => {
//     try {
//         // Construct the path to flights.json
//         const flightsFilePath = path.join(__dirname, 'flights.json');
        
//         // Read the contents of flights.json asynchronously
//         const flightData = JSON.parse(await fs.promises.readFile(flightsFilePath, 'utf-8'));

//         // Log the data to verify its structure
//         console.log(flightData);  // Add this line to debug

//         // Insert each flight into the Flights table
//         for (const flight of flightData) {
//             await Flight.create({
//                 flightNumber: flight.flightNumber,
//                 flightName: flight.flightName,
//                 source: flight.source,
//                 destination: flight.destination,
//                 departureTime: flight.departureTime,  // Ensure time format is correct
//                 arrivalTime: flight.arrivalTime,  // Ensure time format is correct
//                 price: flight.price,
//             });
//         }

//         console.log('All flights have been successfully added to the database.');
//     } catch (error) {
//         console.error('Error while loading flights:', error);
//     }
// };

// // Call loadFlights to load flights when the server starts
// loadFlights();

router.get('/', async (req, res) => {
    try {
        const flights = await Flight.findAll();
        const flightData = flights.map(flight => ({
            flightNumber: flight.flightNumber,
            flightName: flight.flightName,
            source: flight.source,
            destination: flight.destination,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            price: flight.price,
        }));
        res.status(200).json(flightData);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ message: 'Error fetching flights', error });
    }
});
// router.get('/cities', async (req, res) => {
//     try {
//         const cities = await Flight.findAll({
//             attributes: ['source', 'destination'],
//         });

//         // Collect and merge all cities into a unique set
//         const citySet = new Set();
//         cities.forEach(flight => {
//             citySet.add(flight.source);
//             citySet.add(flight.destination);
//         });

//         // Convert set to array and send as response
//         res.status(200).json([...citySet]);
//     } catch (error) {
//         console.error("Error fetching cities:", error);
//         res.status(500).json({ message: 'Error fetching cities', error });
//     }
// });
module.exports = router;
