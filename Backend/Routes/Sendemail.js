const express = require('express');
const router = express.Router();
const sendTicketEmail = require('./Email') // Adjust the path to where the sendTicketEmail function is located

router.post('/', (req, res) => {
    const { recipientEmail, ticketDetails } = req.body;

    console.log('Sending email...');

    if (!recipientEmail || !ticketDetails) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Call the sendTicketEmail function to send the email
    sendTicketEmail(recipientEmail, ticketDetails);

    // Respond with success message
    res.status(200).json({ message: 'Ticket email sent successfully' });
});

module.exports = router;
