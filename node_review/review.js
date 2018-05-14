var http = require('http');

//Importing your own module
var date= require('./datetime');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Time is: ' + date.datetime())
    res.end('Hello World!');


}).listen(8080);

