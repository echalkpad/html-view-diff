define(function (require, exports) {
	var grab = require('../document-grab/grab')
	var Snapshot = require('../model/snapshot')
	var sync = require('../sync/sync')
	var protobuf = require('../sync/protobuf')

	exports.init = function () {
		sync.init()
		protobuf.init(function () {
			var snapshot = grab(document)
			console.log(snapshot)
			snapshot.save(function () {
				console.log('save success')
			})
		})
	}
})