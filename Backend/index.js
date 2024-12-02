const express = require('express');
const app = express();
const db = require('./models');  // Ensure your models are correctly set up in the models directory
const cors = require('cors');

// Use CORS and JSON body parser middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRouter = require('./Routes/Users');
const flightRouter = require('./Routes/Flights');
const cityRouter = require('./Routes/Cities');
const searchRouter = require('./Routes/Searchflights');
const passengerRouter = require('./Routes/Passengers');
const emailRouter = require('./Routes/Sendemail');  // Import the send email router
const bookingRouter= require('./Routes/Booking');
const trackRouter= require('./Routes/Trackflight');
// Use the routes
app.use('/users', userRouter);
app.use('/flights', flightRouter);
app.use('/cities', cityRouter);
app.use('/searchflights', searchRouter);
app.use('/addpassenger', passengerRouter);
app.use('/send-ticket', emailRouter);  // Use the email router with the /send-ticket path
app.use('/bookings',bookingRouter);
app.use('/trackflight',trackRouter);
// Sync Sequelize models and start the server
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on http://localhost:3001');
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
