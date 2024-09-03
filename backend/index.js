const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const app = express();

app.use(cors({
  origin: 'https://bulk-mail-frontend-ten.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST'], // Allow both GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

app.use(express.json());

mongoose.connect('mongodb+srv://sriram:123@cluster0.9vvnu.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to DB');
}).catch((error) => {
  console.log('Failed to connect to DB', error);
});

const credentials = mongoose.model('credentials', {}, 'bulkmail');

app.post('/sendmail', function (req, res) {
  var msg = req.body.msg;
  var emailList = req.body.emailList;

  credentials.find().then(function (data) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
    });

    new Promise(async function (resolve, reject) {
      try {
        for (let i = 0; i < emailList.length; i++) {
          await transporter.sendMail({
            from: 'sriramanusri01@gmail.com',
            to: emailList[i],
            subject: 'A message from Bulk Mail App',
            text: msg
          });
          console.log('Email sent to:' + emailList[i]);
        }
        resolve('success');
      } catch (error) {
        reject('failed');
      }
    }).then(function () {
      res.send(true);
    }).catch(function () {
      res.send(false);
    });

  }).catch(function (error) {
    console.log(error);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
