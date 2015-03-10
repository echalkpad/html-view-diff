define(function (require) {
	var protobuf = require('../sync/protobuf')

	var SnapshotDom = function (options) {
		this.tag = options.tag                  // tag name
		this.tagId = options.tagId              // tag id
		this.css = options.css                  // computedCss
		this.attributes = options.attributes    // key-value of attribute node
		this.text = options.text                // direct inner text
		this.children = []                      // children dom
	}


	SnapshotDom.prototype.toProtobuf = function () {
		var me = this
		var model = new protobuf.SnapshotDom({
			tag: me.tag,
			tagId: me.tagId,
			css: me.css
		})
		console.log(111)
		return model
	}

	return SnapshotDom
})