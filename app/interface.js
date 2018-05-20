const express = require('express')
const app = express()

const fileUpload = require('express-fileupload');
var cors = require('cors');
var bodyParser = require('body-parser')

app.use( bodyParser.json() );
app.use(fileUpload());
app.use(cors({
    origin: [],
  credentials: true,
}));

const userclass = require('./User');
const User = userclass.User;
app.post('/api/login', function (req, res) {
    User.importCardToNetwork(req.files.card.data).then(function(idCardName) {
        if (!idCardName) {
            res.status(403).json({message: "Logging failed"});
        }
        res.json({message: "Logging Successful", accessToken: idCardName})    
    }).catch(function (error) {
        res.status(403).json({message: "Login failed", error: error.toString()})    
    })
})

app.post('/api/ping', function (req, res) {
  // ...
})

app.post('/api/logout', function (req, res) {
  // ...
})

app.listen(3000);