const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'k224341@nu.edu.pk',  // Your Gmail address
    pass: 'tynq ujat dvhs hkem'   // Your Gmail app password (use app password if 2FA is enabled)
  }
});

const sendTicketEmail = (recipientEmail, ticketDetails) => {
    console.log("I am in sendticket");
    
    // Set email options
    const mailOptions = {
        from: 'k224341@nu.edu.pk',    // Sender address
        to: recipientEmail,            // Recipient's email (user's email)
        subject: 'Your Flight Booking Ticket',  // Email subject
        html: `<h1 style="text-align: center; color: #4a90e2; font-family: Arial, sans-serif;">Your Flight Booking Ticket</h1>

<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f9; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
  
  <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">Flight Details</h2>
  
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    <strong>Flight Number:</strong> ${ticketDetails.selectedFlight.flightNumber}
  </p>
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    <strong>Flight Name:</strong> ${ticketDetails.selectedFlight.flightName}
  </p>
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    <strong>From:</strong> ${ticketDetails.selectedFlight.source} <strong>To:</strong> ${ticketDetails.selectedFlight.destination}
  </p>
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    <strong>Total Price:</strong> Rs. ${ticketDetails.totalPrice}
  </p>

  <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">Passenger Details</h2>
  
  ${ticketDetails.passengers.map(p => `
    <div style="border-top: 1px solid #ddd; padding-top: 10px;">
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        <strong>Name:</strong> ${p.FirstName} ${p.LastName}
      </p>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        <strong>Passport Number:</strong> ${p.PassportNumber}
      </p>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        <strong>Contact Number:</strong> ${p.ContactNumber}
      </p>
    </div>
  `).join('')}
  
  <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #555; line-height: 1.6;">
    Thank you for choosing AiR Travel!
  </p>
  
</div>

<div style="text-align: center; margin-top: 30px;">
  <p style="color: #888; font-size: 14px;">This email was sent to you by Your Airline Name.</p>
</div>`

    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
            return;
        }
        console.log('Email sent successfully:', info.response);
    });
};

// Export the sendTicketEmail function to use it in other files
module.exports = sendTicketEmail;
