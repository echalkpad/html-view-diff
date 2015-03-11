define(function () {
	var addCss = function (node) {
		var css = '#' + node.tagId + '{'
		for (var key in node.css) {
			css += key + ':' + node.css[key] + ';'
		}
		css += '}\n'
		document.styleSheets[0].insertRule(css, 0)
	}

	var addAttributes = function (element, attr) {
		for (var key in attr) {
			var value = attr[key]
			element.setAttribute(key, value)
		}
	}

	var createElement = function (node) {
		var element = document.createElement(node.tag)
		element.id = node.tagId
		if (node.text) {
			var textNode = document.createTextNode(node.text)
			element.appendChild(textNode)
		}
		addCss(node)
		addAttributes(element, node.attributes)
		return element
	}

	var _preOrder = function (parent, invoke) {
		for (var i in parent.children) {
			var child = parent.children[i]
			invoke(child, parent)
			_preOrder(child, invoke)
		}
	}

	var preOrder = function (root, rootElement, invoke) {
		invoke(root, {
			_element: rootElement
		})
		_preOrder(root, invoke)
	}


	var recover = function (dom) {
		var rootElement = document.documentElement
		preOrder(dom, rootElement, function (child, parent) {
			var childElement = child._element = createElement(child)
			var parentElement = parent._element
			parentElement.appendChild(childElement)
		})

		document.documentElement.appendChild(rootElement)
	}

	return recover
})