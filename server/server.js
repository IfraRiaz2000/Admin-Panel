// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// // Enable CORS for requests from http://localhost:3000
// app.use(cors({ origin: 'http://localhost:3000' }));

// // Parse JSON request bodies
// app.use(express.json());

// app.post('/send-emails', async (req, res) => {
//     const { recipients, email, password } = req.body;

//   // Create a transporter for sending emails
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'ifrachaudary2000@gmail.com',
//       pass: 'yflcbqhnpmrotazy',
//     },
//   });

//   // Create a mail options object
//   const mailOptions = {
//     from: 'ifrachaudary2000@gmail.com',
//   to: recipients.join(','),
//   subject: 'Approval Email',
//   text: `Congradulations! Your account has been approved.\n Use your email and password to login to your account.\n\nEmail: ${email}\nPassword: ${password}`,
//   };

//   try {
//     // Send the email


//     await transporter.sendMail(mailOptions);
//     console.log('Emails sent successfully');
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     res.sendStatus(500);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 5000;



// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse JSON request bodies
app.use(express.json());

app.post('/send-emails', async (req, res) => {
  const { recipients, email, password, rejection,message, resolve} = req.body;

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ifrachaudary2000@gmail.com',
      pass: 'yflcbqhnpmrotazy',
    },
  });

  let subject, text;

  if (rejection) {
    // Rejection email
    subject = 'Rejection Email';
    text = `We regret to inform you that your account has been rejected.`;
  } else {
    // Approval email
    subject = 'Approval Email';
    text = `Congratulations! Your account has been approved.\nUse your email and password to log in to your account.\n\nEmail: ${email}\nPassword: ${password}`;
  } 
  if(!resolve){
    subject = "Customer Support"
    text= message;

  }

  // Create a mail options object
  const mailOptions = {
    from: 'ifrachaudary2000@gmail.com',
    to: recipients.join(','),
    subject: subject,
    text: text,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Emails sent successfully');
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending emails:', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});