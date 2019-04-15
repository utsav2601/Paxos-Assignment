'use strict';

const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
var db = {} //Example database, Only valid for applicaton lifetime

//Settings
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// Just a hello world test
app.get('/', (req, res) => {
  res.send('Hello world\n');
  });

//Endpoint: /messages
//Input: { '{"message": "foo"}' } 
//Output: Create hash for defined message
app.post('/messages', function( req, res ){
		if( req.body == undefined || req.body.message == undefined || req.body.message == "" )
		{
			var err = "not a valid message"
			console.log(err);
			res.status (400)
			res.send(err)
			return;
		}
		var hashVar = req.body.message
		console.log("received post message: " + req.body.message)
		var hash = crypto.createHash('sha256').update(hashVar).digest('hex');
		db[hash] = hashVar //store
		var response = {}
		response['digest'] = hash
		res.send( JSON.stringify(response) + "\n");
});

///Endpoint: /messages/:hash
//Input: { '{"message": "foo"}' } 
//Output: Return value for defined hash
app.get('/messages/:hash', function( req, res ){
	console.log('received get message hash:' + req.params.hash);
	var response = {}
	var status = '404'
	if ( req.params.hash in db )
	{
		response['message'] = db[req.params.hash]
		console.log("return key:" + JSON.stringify(response)) 
		status = 200
	}
	else
	{
		response['err_msg'] = "message not found"
	}
	res.status(status)
	var ret = JSON.stringify(response)
	res.send(ret)
});



app.listen(PORT, HOST);
  console.log('Running on http://"' + HOST + ':'+ PORT);



