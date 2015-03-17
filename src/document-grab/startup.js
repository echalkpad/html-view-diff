define(function (require, exports) {
	var documentGrab = require('grab')
	var Snapshot = require('../model/snapshot')
	var sync = require('../sync/sync')
	var protobuf = require('../sync/protobuf')

	exports.init = function () {
		var dom = documentGrab(document)

		sync.init()
		protobuf.init(function () {
			dom.save(function () {
				console.log('save success')
			})
		})
	}
})