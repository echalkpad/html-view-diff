define(function (require, exports) {
	var documentGrab = require('../document-grab/document-grab')
	var Snapshot = require('../model/snapshot')
	var sync = require('../sync/sync')

	exports.init = function () {
		alert()
		console.log(1111111111111111111)
		var dom = documentGrab()
		console.log(dom)

		sync.init()
		var snap = new Snapshot({
			dom: dom
		})
		snap.save()
	}
})