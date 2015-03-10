define(function (require) {
	var SnapshotDom = require('src/model/snapshot-dom')
	var protobuf = require('src/sync/protobuf')

	module('SnapshotDom')

	test('toProtobuf(): single case', function (assert) {
		var done = assert.async()
		protobuf.init(function () {
			var dom = new SnapshotDom({
				tag: 'div',
				tagId: 'xyz',
				css: {
					background: '#333',
					webkitMask: 'none',
					'z-index': 123
				}
			})
			dom = dom.toProtobuf()
			console.log(dom)

			done()
		})
	})
})