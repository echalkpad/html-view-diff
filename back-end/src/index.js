var express = require('express')
var bodyParser = require('body-parser')


var app = express()
app.use('/static', express.static('../front-end'))
app.use(bodyParser.urlencoded({extended: true}))
require('./data-manager')(app)

app.listen(12345)