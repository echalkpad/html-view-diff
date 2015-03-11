define(function (require, exports) {
	var protobuf = require('protobuf')

	exports.init = function (done, url) {
		var me = this
		// '../../src/model/snapshot.proto'
		protobuf.loadProtoFile(url ? url : 'http://localhost:63342/html-view-diff/src/model/snapshot.proto', function (err, builder) {
			if (err) {
				throw err
			}
			me.SnapshotDom = builder.build('SnapshotDom')
			me.Snapshot = builder.build('Snapshot')
			done()
		})
	}

})