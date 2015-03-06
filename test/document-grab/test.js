define(function (require, exports) {
	var documentGrab = require('src/document-grab/index')
	var IdGenerator = require('src/document-grab/id-generator')

	var createElement = function (node) {
		var tag = document.createElement(node.tag)
		tag.id = node.id
		if (node.text) {
			var textNode = document.createTextNode(node.text)
			tag.appendChild(textNode)
		}
		return tag
	}

	var _preOrder = function (parent, invoke) {
		for (var i in parent.children) {
			var child = parent.children[i]
			invoke(child, parent)
			_preOrder(child, invoke)
		}
	}

	var preOrder = function (root, invoke) {
		invoke(root, {
			_element: document.getElementsByClassName('page2')[0]
		})
		_preOrder(root, invoke)
	}

	exports.init = function () {
		//// test IdGenerator
		//var g = new IdGenerator()
		//console.log(g.generate())
		//console.log(g.generate())


		// test grab
		var dom = documentGrab()
		console.log(dom)

		preOrder(dom, function (child, parent) {
			var childElement = child._element = createElement(child)
			var parentElement = parent._element
			parentElement.appendChild(childElement)
		})
	}

})