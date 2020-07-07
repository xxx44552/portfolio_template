const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const config = require('../config');
const User = require("../models/user");

const jsonParser = bodyParser.json();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});


router.post('/mail', jsonParser, async function (request, response) {
  if(!request.body.fbName || !request.body.fbEmail || !request.body.fbMess) {
    return response.sendStatus(400);
  }
  console.log(request.body)

  const user = await User.findOne().findOne().sort({created_at: -1});

  var mailOptions = {
    from: 'webinme.ru@gmail.com',
    to: user.email,
    subject: 'Обратная связь - webinme.ru',
    text: `Сообщение от: ${request.body.fbName}`,
    html: `<p>${request.body.fbName}</p>
            <p>${request.body.fbEmail}</p>
            <p>${request.body.fbMess}</p>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
      response.sendStatus(400);
    }else {
      console.log(info)
      response.sendStatus(200);
    }
  });
})


module.exports = router;
