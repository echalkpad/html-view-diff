define(function (require) {
	var protobuf = require('../sync/protobuf')
	var ByteBuffer = require('ByteBuffer')
	var _ = require('underscore')
	var $ = require('jquery')

	var SnapshotDom = function (options) {
		this.tag = options.tag                                      // tag name
		this.id = options.id                                        // tag id
		this.css = options.css                                      // computedCss
		this.attributes = options.attributes                        // key-value of attribute node
		this.text = options.text ? options.text : ''                // direct inner text
		this.children = options.children ? options.children : []    // children dom
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

		// create attribute
		var attrModel = {}
		for (var i in protoModel.attributes) {
			var att = protoModel.attributes[i]
			attrModel[att.key] = att.value
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
			text: protoModel.text,
			children: children,
			attributes: attrModel
		})
		return model
	}


	SnapshotDom.fromProtobuf = function (data) {
		var encode = ByteBuffer.fromBase64(data)
		var protoModel = protobuf.SnapshotDom.decode(encode)
		return SnapshotDom._fromProtobufModel(protoModel)
	}

	SnapshotDom.prototype.toProtobufJSON = function () {
		var children = _.map(this.children, function (child) {
			return child.toProtobufJSON()
		})
		var attributes = _.pairs(this.attributes).map(function (keyValue) {
			var key = keyValue[0]
			var value = keyValue[1]
			return {
				key: key,
				value: value
			}
		})
		return {
			tag: this.tag,
			tagId: this.tagId,
			css: this.css,
			text: this.text,
			children: children,
			attributes: attributes
		}
	}


	SnapshotDom.prototype.toProtobuf = function () {
		var model = new protobuf.SnapshotDom(this.toProtobufJSON())
		return model.encode().toBase64()
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