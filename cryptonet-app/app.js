const express = require('express');
const axios = require('axios');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');

app.get('/', (req,res) => {

	res.render('index.hbs');

});
// const bodyParser = require('body-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/getAccs', (req,res) => {


	var allMembers = axios.get('http://localhost:3000/api/org.vishnuchopra.cryptonet.CryptoBalance')
	.then(
		(response) => {
			
			var data = JSON.stringify(response.data);
			console.log(data);
			res.send(response.data);
		}
	)
	.catch ( (er) => {
		console.log(er);
	}
	);
	// res.send(allMembers);
});


app.use(bodyParser.json());
app.get('/getMembers', (req,res) => {


	var allMembers = axios.get('http://localhost:3000/api/org.vishnuchopra.cryptonet.Member')
	.then(
		(response) => {
			
			var data = JSON.stringify(response.data);
			console.log(data);
			res.send(response.data);
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
// ---------------------------------------------------------------------------
/** /createUser : req body => {	"pid":, "fname":, "lname":, "pk":

							}
*/
app.post('/createUser', (req,res) => {
	console.log(req.body);
	axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.Member', 
		{
			"$class": "org.vishnuchopra.cryptonet.Member",
			"participantId": req.body.pid,
			"firstName": req.body.fname,
			"lastName": req.body.lname,
			"AC":"org.vishnuchopra.cryptonet.CryptoBalance#"+req.body.pid,
			"passcode" : "zzzeiudsoi",
			"pk" : req.body.pk
		})
	.then(
		(response) => {
			

			var data = JSON.stringify(response.data);
			console.log(response.status,response.statusText);
			res.send(response.statusText);
		}
	)
	.then(
		(response) => {
			axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.CryptoBalance', 
		{
			"$class": "org.vishnuchopra.cryptonet.CryptoBalance",
			"ACno":req.body.pid,
			"inputs" : [],
			"unspentBalance" : 0
		});
		}
		)
	.catch ( (er) => {
		// console.log(er);
	}
	);

});

// ---------------------------------------------------------------------------
// simplePay : req body => {	"payer":, "payee":, "amt": }


app.post('/simplePay', (req,res) => {

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

// ---------------------------------------------------------------------------
// addValue : req body => {"pid":, "amt":}

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

// ---------------------------------------------------------------------------
// utxoPay : req body => {"payer":, "payee":, amt":}
app.post('/utxoPay', (req,res) => {
	axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.utxoPay', 
		{
			"$class": "org.vishnuchopra.cryptonet.utxoPay",
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
		console.log(er);
	}
	);
});

// ---------------------------------------------------------------------------
// safePay : req body => {"payer":, "payee":, amt":, "specialK":, "P":, "G"}

app.post('/safePay', (req,res) => {

	axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.safePay', {
			"$class": "org.vishnuchopra.cryptonet.safePay",
			"payer": "org.vishnuchopra.cryptonet.Member#"+req.body.payer,
			"payee": "org.vishnuchopra.cryptonet.Member#"+req.body.payee,
			"amt":req.body.amt,
			"y":req.body.specialK,
			"pubkeys":[req.body.P,req.body.G]
	})
	.then(
		(response) => {
			console.log(response);
		}
	)
	.catch(
		(er) => {
			console.log(er);
		});
});

// ---------------------------------------------------------------------------
// mineCheck : req body => {"miner":, "hexDig":}

app.post('/mineCheck', (req,res) => {
	const sha256 = require("sha-256-js");
	const padding = sha256((Math.random()*10000000000000000000000000000).toString());
    const solution = sha256(padding+req.body.hexDig);   
  	const MCtx = {
        "miner":"org.vishnuchopra.cryptonet.Member#"+req.body.miner,
        "hexDig":req.body.hexDig
    }
            
	axios.post('http://localhost:3000/api/org.vishnuchopra.cryptonet.mineCheck', MCtx)
	.then( (response) => {
		console.log(response.status,response.statusText);
	})
	.catch((er) => {
		console.log(er);
	})
});

// ---------------------------------------------------------------------------
// getTransactions : req body => {}

app.get("/getTransactions", (req,res) => {

	axios.get('http://localhost:3000/api/system/historian')
	.then( (response) => {
		var data = JSON.stringify(response.data);
			console.log(data);
			res.send(response.data);
	})
	.catch ((e) => {
		res.send(e.statusText);
	});
});

app.listen(8000);