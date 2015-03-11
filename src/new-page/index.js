define(function (require, exports) {
	var sync = require('../sync/sync')
	var protobuf = require('../sync/protobuf')
	var SnapshotDom = require('../model/snapshot-dom')
	var recover = require('../document-grab/recover')

	exports.init = function () {
		protobuf.init(function () {
			sync.getSnapshotDom('xx', function (data) {
				var dom = SnapshotDom.fromProtobuf(data)
				console.log(dom)
				recover(dom)
			})
		})
	}
})