define(function (require, exports) {
	var sync = require('../sync/sync')
	var Case = require('../model/case')
	var Snapshot = require('../model/snapshot')
	var Chance = require('chance')
	var $ = require('jquery')
	var documentGrab = require('../document-grab/document-grab')


	var inspectScript = function (document, url) {
		var script = document.createElement('script')
		script.src = url
		var head = document.getElementsByTagName('head')[0]
		document.documentElement.appendChild(script)
	}

	exports.init = function () {
		var document = $('.old')[0].contentDocument
		//inspectScript(document, 'http://localhost:63342/html-view-diff/src/document-grab/require.js')


		//var random = new Chance
		sync.init()


		setTimeout(function () {
			var dom = documentGrab(document)
			console.log(dom)
		}, 1500)


		//var c = new Case({
		//	_id: random.guid(),
		//	name: '1234',
		//	snapshots: [
		//		new Snapshot({
		//			dom: '123'
		//		})
		//	]
		//})
		//c.save()
		//console.log(c.toJSON())
	}
})