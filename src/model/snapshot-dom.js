define(function (require) {
	var protobuf = require('../sync/protobuf')
	var ByteBuffer = require('ByteBuffer')
	var _ = require('underscore')
	var $ = require('jquery')

	var SnapshotDom = function (options) {
		this.tag = options.tag                  // tag name
		this.tagId = options.tagId              // tag id
		this.css = options.css                  // computedCss
		//this.attributes = options.attributes    // key-value of attribute node
		//this.text = options.text                // direct inner text
		this.children = options.children ? options.children : []        // children dom
	}


	SnapshotDom._fromProtobufModel = function (protoModel) {
		// create css model
		var css = {}
		for (var key in protoModel.css) {
			if (protoModel.css.hasOwnProperty(key)) {
				var value = protoModel.css[key]
				css[key] = value
			}
		}

		// create children
		var children = _.map(protoModel.children, function (child) {
			return SnapshotDom._fromProtobufModel(child)
		})

		// create the model
		var model = new SnapshotDom({
			tag: protoModel.tag,
			tagId: protoModel.tagId,
			css: css,
			children: children
		})
		return model
	}


	SnapshotDom.fromProtobuf = function (data) {
		var encode = ByteBuffer.fromBinary(data)
		var protoModel = protobuf.SnapshotDom.decode(encode)
		return SnapshotDom._fromProtobufModel(protoModel)
	}


	SnapshotDom.prototype.toProtobuf = function () {
		var me = this
		var model = new protobuf.SnapshotDom({
			tag: me.tag,
			tagId: me.tagId,
			css: me.css,
			children: me.children
		})
		return model.encode().toBinary()
	}


	SnapshotDom.prototype.save = function (done) {
		var me = this
		var data = me.toProtobuf()
		$.post('http://127.0.0.1:12345/snapshot', data, function (res) {
			done()
		}, 'text')
	}

	return SnapshotDom
})