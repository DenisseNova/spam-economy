const nodemailer = require('nodemailer');

function enviar () {

  let transporter = nodemailer.createTransport({ service: 'gmail',
    auth: {
    user:'desafio.edutecno@gmail.com',
    pass: 'Ni4l3k2j1'
    }
  })

  let mail = {
    from: 'desafio.edutecno@gmail.com', 
    to: 'desafio.edutecno@gmail.com', 
    subject: 'Nodemailer Test', 
    html: 'PRUEBAAAAAAAAA'
  }

  transporter.sendMail(mail, (err, data) => { 
    if (err) console.log(err)
    if (data) console.log (data)
  })

};

module.exports = {enviar};
