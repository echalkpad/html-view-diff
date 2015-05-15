var express = require('express')
var bodyParser = require('body-parser')


var app = express()
app.use('/static', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	next()
}, express.static('../front-end'))
app.use(bodyParser.urlencoded({extended: true}))
require('./data-manager')(app)

app.listen(12345)