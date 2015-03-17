define(function (require) {
	var protobuf = require('../sync/protobuf')
	var TextNodeData = require('./text-node-data')
	var ByteBuffer = require('ByteBuffer')
	var _ = require('underscore')
	var $ = require('jquery')

	var ElementNodeData = function (options) {
		this.id = options.id                                        // identity
		this.tagName = options.tagName                              // tag name
		this.css = options.css                                      // computed css
		this.attributes = options.attributes                        // key-value of attribute nodes
		this.children = options.children ? options.children : []    // children dom
	}


	// pass the json to constructor
	ElementNodeData.prototype._toProtobufJSON = function () {
		var children = _.map(this.children, function (child) {
			return child._toProtobufJSON()
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
			id: this.id,
			elementData: {
				tagName: this.tagName,
				css: this.css,
				attributes: attributes,
				children: children
			},
			textData: null
		}
	}

	ElementNodeData.prototype.save = function (done) {
		var me = this
		var data = me.toProtobuf()
		$.post('http://127.0.0.1:12345/snapshot', data, function (res) {
			done()
		}, 'text')
	}

	ElementNodeData.prototype.toProtobuf = function () {
		var model = new protobuf.NodeData(this._toProtobufJSON())
		return model.encode().toBase64()
	}

	ElementNodeData.fromProtobuf = function (data) {
		var encode = ByteBuffer.fromBase64(data)
		var protoModel = protobuf.NodeData.decode(encode)
		return this._fromProtobufModel(protoModel)
	}

	ElementNodeData._fromProtobufModel = function (proto) {
		// create css model
		var css = {}
		var cssModel = proto.elementData.css
		for (var key in cssModel) {
			if (cssModel.hasOwnProperty(key)) {
				var value = cssModel[key]
				css[key] = value
			}
		}

		// create attribute
		var attrs = {}
		var attrsModel = proto.elementData.attributes
		for (var i in attrsModel) {
			var att = attrsModel[i]
			attrs[att.key] = att.value
		}

		// create children
		var children = _.map(proto.elementData.children, function (child) {
			if (child.elementData) {
				return ElementNodeData._fromProtobufModel(child)
			} else {
				return TextNodeData._fromProtobufModel(child)
			}
		})

		// create the model
		var model = new ElementNodeData({
			id: proto.id,
			tagName: proto.elementData.tagName,
			css: css,
			attributes: attrs,
			children: children
		})
		return model
	}


	return ElementNodeData
})