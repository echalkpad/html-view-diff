define(function (require, exports) {
	var protobuf = require('protobuf')

	exports.init = function (done, url) {
		var me = this
		protobuf.loadProtoFile(url ? url : '../../src/model/snapshot.proto', function (err, builder) {
			console.log(builder)
			me.SnapshotDom = builder.build('SnapshotDom')
			me.Snapshot = builder.build('Snapshot')
			done()
		})
	}

})