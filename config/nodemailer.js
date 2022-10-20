const nodemailer = require('nodemailer');

exports.mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codewithnikhilofficial@gmail.com',
        pass: 'codewithnikhil@123'
    }
});
