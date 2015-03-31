var fs = require('fs')
var path = require('path')
var http = require('http')
var childProcess = require('child_process')
var connect = require('connect')

var DB_PATH = 'c:/project/snapshot-db'
var latestId


var saveAsFile = function (apath, req, done) {
	var str = ''
	req.on('data', function (chunck) {
		str += chunck
	})
	req.on('end', function () {
		fs.writeFile(apath, str, function (err) {
			if (err) throw err
			console.log('save file')
			done()
		})
	})
}


var grabHandler = function (match, req, res) {
	var url = match[1]
	console.log('begin to grab: ' + url)
	var child = childProcess.execFile('cmd.cmd', function (err, stdout, stderr) {
		if (err) {
			throw err
		}
		if (stderr) {
			throw stderr
		}
		if (stdout) {
			console.log(stdout)
		}
	})
	child.on('exit', function () {
		res.write('ok ' + new Date().getTime())
		res.end()
	})
}


var getSnapshotHandler = function (match, req, res) {
	var id
	if (match.length > 1) {
		id = match[1]
	} else {
		id = latestId
	}

	fs.readFile(path.join(DB_PATH, id), function (err, content) {
		if (err) throw err
		res.write(content)
		res.end()
	})
}


var routers = [
	[/snapshot$/, getSnapshotHandler],
	[/snapshot\/(\d+)$/, getSnapshotHandler],
	[/grab\?url=(.*)$/, grabHandler]
]

var server = http.createServer(function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	if (req.method == 'POST') { // set a new dom
		var match = req.url.match(/snapshot$/)
		if (match) {
			var time = latestId = new Date().getTime() + ''
			saveAsFile(path.join(DB_PATH, time), req, function () {
				res.write('ok')
				res.end()
			})
		}
	} else if (req.method == 'GET') { // get a new dom
		for (var i in routers) {
			var router = routers[i]
			var reg = router[0]
			var match = req.url.match(reg)
			if (match) {
				router[1](match, req, res)
				break
			}
		}
	}
})
//server.listen(12345, '127.0.0.1')


var app = connect()
app.use(connect.static('static'))
app.listen(12345)