const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const app = express();

app.use(cors({
  origin: "https://bulkmailer-frontend.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

mongoose.connect('mongodb+srv://sriram:123@cluster0.9vvnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {}).then(() => {
  console.log('Connected to DB');
}).catch((error) => {
  console.log('Failed to connect to DB', error);
});

const credentials = mongoose.model('credentials', {}, 'bulkmail');


app.get('/',function(req,res){
  res.send('success')
})

app.post('/sendmail', function (req, res) {
  try{
  var msg = req.body.msg;
  var emailList = req.body.emailList;


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "sriramanusri01@gmail.com",
        pass: "fizm ytof jvco jgdh"
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


  }
  catch(error){
    res.send(error)
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
