const express = require('express')
const app = express();
var cors = require('cors')
var axios = require('axios');
const request = require("request");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json())
app.use(cors())

const port = 5000;
// var admin = require('firebase-admin');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var admin = require("firebase-admin");

var serviceAccount = require("./firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://name-aea4e.firebaseio.com"
});
var db = admin.firestore();
var user = db.collection('Student');

app.post('/student', (req, res) => {
    user.add({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
  });

  // Reference: https://www.joshmorony.com/adding-captcha-to-ionic-with-nodejs-middleware/
  const captchaCheck = (req, res, next) => {
    let urlEncodedData = 'secret=6Lf39t0ZAAAAAAdGqx_5AEQUKQKRHxXKXh35usbQ&response=' + req.body.captchaResponse + '&remoteip=' + req.connection.remoteAddress;
    axios.post('https://www.google.com/recaptcha/api/siteverify', urlEncodedData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        if(res.data.success){
          next();
        } else {
          res.status(401).send({message: 'No bots!'});
        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({message: 'No bots!'});
    });
}


  app.post('/token_validate',captchaCheck, (req, res)=>{
    res.json('Hello, human.');  
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});