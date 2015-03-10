define(function (require) {
	var protobuf = require('protobuf')

	var SnapshotDom = function (options) {
		this.tag = options.tag                  // tag name
		this.tagId = options.tagId              // tag id
		this.css = options.css                  // computedCss
		this.attributes = options.attributes    // key-value of attribute node
		this.text = options.text                // direct inner text
		this.children = []                      // children dom
	}


	SnapshotDom.prototype.toProtobuf = function () {

	}

	return SnapshotDom
})