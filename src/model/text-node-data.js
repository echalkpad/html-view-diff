define(function () {
	var TextNodeData = function (options) {
		this.id = options.id
		this.text = options.text
	}

	TextNodeData.prototype.toProtobufJSON = function () {
		return { // pass it to NodeData
			id: this.id,
			elementData: null,
			textData: {
				text: this.text
			}
		}
	}

	return TextNodeData
})