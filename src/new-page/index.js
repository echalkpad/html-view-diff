define(function (require, exports) {
	var sync = require('../sync/sync')
	var protobuf = require('../sync/protobuf')
	var SnapshotDom = require('../model/element-node-data')
	var recover = require('../document-grab/recover')
	var addMask = require('../document-grab/add-mask')
	var $ = require('jquery')

	exports.init = function () {
		protobuf.init(function () {
			sync.getSnapshotDom('xx', function (data) {
				var dom = SnapshotDom.fromProtobuf(data)
				console.log(dom)
				recover(dom)

				//setTimeout(function () {
				// test add mask
				addMask($('embed')[0])
				//}, 1000)
			})
		})
	}
})