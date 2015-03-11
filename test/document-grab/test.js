define(function (require, exports) {
	var documentGrab = require('src/document-grab/document-grab')
	var recover = require('src/document-grab/recover')
	var $ = require('jquery')
	var protobuf = require('src/sync/protobuf')

	var enumCss = function (css) {
		var s = ''
		var i = 1
		for (var key in css) {
			s += ['optional string ', key, ' = ', i, ';\n'].join('')
			i++
		}
		console.log(s)
	}

	exports.init = function () {
		// read wx
		$.get('http://www.hust.edu.cn/', function (html) {
			document.write(html)

			setTimeout(function () {
				// test grab
				var dom = documentGrab()

				protobuf.init(function () {
					//console.log(JSON.stringify(dom).length * 4.0 / 1024 / 1024 + 'MB')
					//console.log(dom.toProtobuf().length / 1024 / 1024 + 'MB')
					dom.save(function () {
						console.log('保存成功')
					})
					recover(dom)
				})

			}, 1000)


		})
	}

})