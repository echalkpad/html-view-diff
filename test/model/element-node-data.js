define(function (require) {
	var ElementNodeData = require('src/model/element-node-data')
	var protobuf = require('src/sync/protobuf')

	module('ElementNodeData')

	test('_toProtobufJSON()', function (assert) {
		var done = assert.async()
		protobuf.init(function () {
			assert.ok(protobuf.NodeData)

			var node = new ElementNodeData({
				id: 'abc',
				tagName: '123',
				css: {
					backgroundColor: '#333'
				},
				attributes: {
					href: '#'
				}
			})
			var model = new protobuf.NodeData(node._toProtobufJSON())
			assert.deepEqual({
				id: model.id,
				elementData: {
					tagName: model.elementData.tagName,
					children: model.elementData.children
				},
				textData: model.textData
			}, {
				id: 'abc',
				elementData: {
					tagName: '123',
					children: []
				},
				textData: null
			})
			assert.equal(model.elementData.css['backgroundColor'], '#333')
			assert.equal(model.elementData.attributes.length, 1)
			assert.equal(model.elementData.attributes[0].key, 'href')
			assert.equal(model.elementData.attributes[0].value, '#')
			done()
		})
	})

	test('_fromProtobufModel()', function (assert) {
		var done = assert.async()
		protobuf.init(function () {
			var node = new ElementNodeData({
				id: '111',
				tagName: 'aaa',
				css: {
					background: '222'
				},
				attributes: {
					y: '333'
				}
			})
			var proto = new protobuf.NodeData(node._toProtobufJSON())
			var json1 = ElementNodeData._fromProtobufModel(proto)._toProtobufJSON()
			var json2 = node._toProtobufJSON()
			delete json1.elementData.css
			delete json2.elementData.css
			assert.deepEqual(json1, json2)
			done()
		})
	})

	//
	//test('toProtobuf()/fromProtobuf(): single case', function (assert) {
	//	var done = assert.async()
	//	protobuf.init(function () {
	//		// build the protobuf
	//		var dom = new ElementNodeData({
	//			tag: 'div',
	//			tagId: 'xyz',
	//			css: {
	//				background: '#333',
	//				webkitMask: 'none',
	//				zIndex: '123'
	//			},
	//			attributes: {
	//				a: 'abc',
	//				b: '123'
	//			}
	//		})
	//		var data = dom.toProtobuf()
	//
	//		// parse the data
	//		var dom2 = ElementNodeData.fromProtobuf(data)
	//		assert.equal(dom.tag, dom2.tag)
	//		assert.equal(dom.tagId, dom2.tagId)
	//		assert.equal(dom.css.background, dom2.css.background)
	//		assert.equal(dom.css.webkitMask, dom2.css.webkitMask)
	//		assert.equal(dom.css.zIndex, dom2.css.zIndex)
	//		assert.deepEqual(dom.attributes, dom2.attributes)
	//
	//
	//		done()
	//	}, '../src/model/snapshot.proto')
	//})
	//
	//
	//test('toProtobuf(): tree case', function (assert) {
	//	var root = new ElementNodeData({
	//		tag: 'body',
	//		tagId: 'a1',
	//		css: {color: 'red'},
	//		children: [
	//			new ElementNodeData({
	//				tag: 'div',
	//				tagId: 'a2',
	//				css: {color: 'blue'},
	//				children: [
	//					new ElementNodeData({
	//						tag: 'p',
	//						tagId: 'a3',
	//						css: {color: 'black'},
	//						children: []
	//					})
	//				]
	//			})
	//		]
	//	})
	//	var data = root.toProtobuf()
	//
	//	var root2 = ElementNodeData.fromProtobuf(data)
	//	assert.equal(root.tag, root2.tag)
	//	assert.equal(root.children[0].tag, root2.children[0].tag)
	//	assert.equal(root.children[0].children[0].tagId, root2.children[0].children[0].tagId)
	//})
})