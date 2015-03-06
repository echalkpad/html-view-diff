define(function () {

	var SnapshotDom = function (options) {
		this.tag = options.tag                  // tag name
		this.id = options.id                    // tag id
		this.css = options.css                  // computedCss
		this.attributes = options.attributes    // key-value of attribute node
		this.text = options.text                // direct inner text
		this.children = []                      // children dom
	}

	return SnapshotDom
})