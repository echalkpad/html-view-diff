define(function (require) {
	var SnapshotDom = require('src/model/snapshot-dom')
	var protobuf = require('src/sync/protobuf')

	module('SnapshotDom')

	test('toProtobuf(): single case', function (assert) {
		var done = assert.async()
		protobuf.init(function () {
			// build the protobuf
			var dom = new SnapshotDom({
				tag: 'div',
				tagId: 'xyz',
				css: {
					background: '#333',
					webkitMask: 'none',
					zIndex: '123'
				}
			})
			var data = dom.toProtobuf()

			// parse the data
			var dom2 = SnapshotDom.fromProtobuf(data)
			assert.equal(dom.tag, dom2.tag)
			assert.equal(dom.tagId, dom2.tagId)
			assert.equal(dom.css.background, dom2.css.background)
			assert.equal(dom.css.webkitMask, dom2.css.webkitMask)
			assert.equal(dom.css.zIndex, dom2.css.zIndex)


			done()
		}, '../src/model/snapshot.proto')
	})


	test('toProtobuf(): tree case', function (assert) {
		var root = new SnapshotDom({
			tag: 'body',
			tagId: 'a1',
			css: {color: 'red'},
			children: [
				new SnapshotDom({
					tag: 'div',
					tagId: 'a2',
					css: {color: 'blue'},
					children: [
						new SnapshotDom({
							tag: 'p',
							tagId: 'a3',
							css: {color: 'black'},
							children: []
						})
					]
				})
			]
		})
		var data = root.toProtobuf()

		var root2 = SnapshotDom.fromProtobuf(data)
		assert.equal(root.tag, root2.tag)
		assert.equal(root.children[0].tag, root2.children[0].tag)
		assert.equal(root.children[0].children[0].tagId, root2.children[0].children[0].tagId)
	})
})