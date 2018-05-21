const express = require('express');
const axios = require('axios');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');

app.get('/', (req,res) => {

	res.render('index.hbs');

});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/getMembers', (req,res) => {


	var allMembers = axios.get('http://localhost:3000/api/org.vishnuchopra.cryptonet.Member')
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

app.get('/getUserInfo', (req,res) => {

	var getUser = axios.get('http://localhost:3000/api/org.vishnuchopra.cryptonet.Member')
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
});



app.post('/createUser', (req,res) => {
	console.log(req.body);
	axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.Member', 
		{
			"$class": "org.vishnuchopra.cryptonet.Member",
			"participantId": req.body.pid,
			"firstName": req.body.fname,
			"lastName": req.body.lname,
			"AC":"org.vishnuchopra.cryptonet.CryptoBalance#"+req.body.pid,
			"passcode" : "zzzeiudsoi"
		})
	.then(
		(response) => {
			

			var data = JSON.stringify(response.data);
			console.log(data);
		}
	)
	.then(
		(response) => {
			axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.CryptoBalance', 
		{
			"$class": "org.vishnuchopra.cryptonet.CryptoBalance",
			"ACno":req.body.pid,
			"value" : 0
		});
		}
		)
	.catch ( (er) => {
		// console.log(er);
	}
	);

});

app.post('/sendPayment', (req,res) => {

	axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.simplePay', 
		{
			"$class": "org.vishnuchopra.cryptonet.simplePay",
			"payer": "org.vishnuchopra.cryptonet.Member#"+req.body.payer,
			"payee": "org.vishnuchopra.cryptonet.Member#"+req.body.payee,
			"amt":req.body.amt
		})
	.then(
		(response) => {
			
			var data = JSON.stringify(response.data);
			console.log(data);
			res.send(data);
		}
	)
	.catch ( (er) => {
		// console.log(er);
	}
	);

});

app.post('/addValue', (req,res) => {

	axios.post("http://localhost:3000/api/org.vishnuchopra.cryptonet.addValue", 
	{
		"$class": "org.vishnuchopra.cryptonet.addValue",
		"adder":"org.vishnuchopra.cryptonet.Member#"+req.body.pid,
		"amt":req.body.amt
	})
	.then()
	.catch((e) => {
		console.log(e);
	});
});

app.listen(8000);