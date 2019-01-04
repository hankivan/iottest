const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const logger = require('morgan')
const routes = require('./server/routes/user.js')
const config = require('config-lite')
const compression = require('compression')
const app = express()
const fs = require('fs');
const http = require('http');

app.set('port', process.env.PORT || 8080);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/dist'));
app.get('/', function(req, res){
		res.redirect('/index');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression({ threshold: 0 }))
app.use('/api', routes)

app.use(function (req, res, next) {
	var err = new Error('This page not found');
	err.status = 404;
	next(err)
})

http.createServer(app).listen(app.get('port'), function(){
		console.log('Exp server listening on port' + app.get('port'));
});
/*app.listen(3001, function () {
	console.log(`Server running in port ${config.port}`)
})*/
