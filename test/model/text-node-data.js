define(function (require) {
	var protobuf = require('src/sync/protobuf')
	var TextNodeData = require('src/model/text-node-data')


	module('TextNodeData')

	
	test('toProtobufJSON()', function (assert) {
		var done = assert.async()
		protobuf.init(function () {
			assert.ok(protobuf.TextNodeData)
			var textNode = new TextNodeData({
				id: 'abc',
				text: '123'
			})
			var protoModel = new protobuf.NodeData(textNode.toProtobufJSON())
			assert.deepEqual({
				id: protoModel.id,
				elementData: protoModel.elementData,
				textData: {
					text: protoModel.textData.text
				}
			}, {
				id: 'abc',
				elementData: null,
				textData: {
					text: '123'
				}
			})

			done()
		})
	})
})