const nodemailer = require("nodemailer");
require('dotenv').config();
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const getBill = async (req, res,next) => {
    const { name, email, message, subject } = req.body;

    // Creating an object 'defaultsetting' containing email
    // service and authentication details
    let defaultsetting = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS
        }
    };

    // Create a transporter object using nodemailer
    let transporter = nodemailer.createTransport(defaultsetting);

    // Create an instance of Mailgen with the 'default' theme
    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'SEHAT E AAM',
            link: 'https://SEHATEAAM.com'
        }
    });

    // Construct the email content using Mailgen
    let response = {
        body: {
            name: 'SEHAT E AAM',
            intro: 'You have received a new Query from a user. Here are the details:',
            table: {
                data: [
                    { item: 'Name', description: name },
                    { item: 'Email', description: email },
                    { item: 'Message', description: message }
                ]
            },
            outro: 'Please contact to the user as soon as possible.'
        }
    };

    // Generate the email HTML content
    let mail = Mailgenerator.generate(response);

    // Define the email options
    let Umessage = {
        from: EMAIL,
        to: 'Muhammadhassanmirzabaig@gmail.com',
        subject: subject,
        html: mail
    };

    // Send the email
    transporter.sendMail(Umessage)
        .then(() => {
            if (!res.headersSent) {
                res.status(203).json("Message sent");
            }
            console.log('Message sent');
        })
        .catch(err => {
            if (!res.headersSent) {
                res.status(403).json(err);
            }
            console.log('Message not sent', err);
        });
};

module.exports = { getBill };
