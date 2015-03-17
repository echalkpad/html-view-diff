define(function () {
	var TextNodeData = function (options) {
		this.id = options.id
		this.text = options.text
	}

	// to JSON
	TextNodeData.prototype._toProtobufJSON = function () {
		return { // pass it to NodeData
			id: this.id,
			elementData: null,
			textData: {
				text: this.text
			}
		}
	}

	// from `new model(JSON)`
	TextNodeData._fromProtobufModel = function (proto) {
		return new TextNodeData({
			id: proto.id,
			text: proto.textData.text
		})
	}

	return TextNodeData
})