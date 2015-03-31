module.exports = function (app) {
	var path = require('path')
	var childProcess = require('child_process')
	var fs = require('fs')

	var DB_PATH = 'c:/project/snapshot-db'

	//app.get('/save/:', function (req, res) {
	//	var str = ''
	//	req.on('data', function (chunck) {
	//		str += chunck
	//	})
	//	req.on('end', function () {
	//		fs.writeFile(apath, str, function (err) {
	//			if (err) throw err
	//			console.log('save file')
	//			done()
	//		})
	//	})
	//})


	// 获取指定ID的snapshot
	app.get('/snapshot/:id', function (req, res) {
		var id = req.params.id
		res.sendFile(path.join(DB_PATH, id))
	})


	// 触发一个grab指定页面的操作
	app.post('/grab', function (req, res) {
		var url = req.body.url
		console.log('begin to grab: ' + url)

		var cmd = [
			'set pythonpath=c:/project/webdriver-demo',
			'cd c:/project/webdriver-demo',
			'python src/grab.py "' + url + '"'
		].join('\n')


		var cmdPath = 'bin/grab.cmd'
		fs.writeFile(cmdPath, cmd, function (err) {
			if (err) {
				throw  err
			}

			var child = childProcess.execFile(cmdPath, null, {
				encoding: 'gbk'
			}, function (err, stdout, stderr) {
				if (err) {
					console.error(err)
				}
				if (stderr) {
					console.error(stderr)
				}
				if (stdout) {
					console.log(stdout)
				}
			})
			child.on('exit', function () {
				res.write('grab ok ' + new Date().getTime())
				res.end()
			})
		})
	})

}