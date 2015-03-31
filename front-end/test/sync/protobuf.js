define(function (require) {
	var protobuf = require('src/sync/protobuf')

	module('protobuf')

	test('init()', function (assert) {
		var done = assert.async()
		protobuf.init(function () {
			assert.ok(protobuf.NodeData)
			done()
		})
	})
})