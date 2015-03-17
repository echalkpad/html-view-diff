define(function (require, exports) {
	var protobuf = require('protobuf')

	exports.init = function (done, url) {
		var me = this
		// 'http://localhost:63342/html-view-diff/src/model/snapshot.proto'
		protobuf.loadProtoFile(url ? url : '../../src/model/snapshot.proto', function (err, builder) {
			if (err) {
				throw err
			}
			me.NodeData = builder.build('NodeData')
			//me.TextNodeData = builder.build('TextNodeData')
			//me.ElementNodeData = builder.build('ElementNodeData')
			done()
		})
	}

})