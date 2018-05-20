const express = require('express');
const axios = require('axios');
const hbs = require('hbs');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

const app = express();

app.set('view engine', 'hbs');

app.get('/', (req,res) => {

	res.render('index.hbs');

});

app.get('/getMembers', (req,res) => {


	var allMembers = axios.get('http://localhost:3000/api/org.vishnuchopra.cryptonet.SampleParticipant')
	.then(
		(response) => {
			
			var data = JSON.stringify(response.data);
			console.log(data);
			res.send(data);
		}
	)
	.catch ( (er) => {
		console.log(er);
	}
	);
	// res.send(allMembers);
});

app.get('/getInfo', )

app.listen(8000);