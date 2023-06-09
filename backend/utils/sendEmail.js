const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

//
var option = {
  auth: {
    api_key: process.env.SEND_MAIL_API_KEY,
  },
};

var Email = nodemailer.createTransport(sgTransport(option));

module.exports = Email;
