define(function () {
	// the body is automatically generated
	var fillBody = function (node) {
		var body = document.getElementsByTagName('body')[0]
		fillElement(body, node)
		return body
	}

	var getKey = function (key) {
		key = key[0].toUpperCase() + key.slice(1)
		var matches = key.match(/[A-Z][a-z]*/g)
		var newKey = matches[0]
		for (var i = 1; i < matches.length; i++) {
			newKey += '-' + matches[i]
		}
		return newKey
	}

	var getKeyHasWebkit = function (key) {
		if (key.slice(0, 6) == 'webkit') {
			return '-webkit-' + getKey(key.slice(6))
		}
		return getKey(key)
	}


	var addCss = function (node) {
		var css = '#' + node.tagId + '{'
		for (var key in node.css) {
			var newKey = getKeyHasWebkit(key)
			css += newKey + ':' + node.css[key] + ';'
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

	var fillElement = function (element, node) {
		element.id = node.tagId
		if (node.text) {
			var textNode = document.createTextNode(node.text)
			element.appendChild(textNode)
		}
		addCss(node)
		addAttributes(element, node.attributes)
	}

	var createElement = function (node) {
		var element = document.createElement(node.tag)
		fillElement(element, node)
		return element
	}

	var addBase = function () {
		var head = document.getElementsByTagName('head')[0]
		var base = document.createElement('base')
		base.setAttribute('href', 'http://www.12306.cn/mormhweb/')
		head.appendChild(base)
	}

	var _preOrder = function (parent, invoke) {
		for (var i in parent.children) {
			var child = parent.children[i]
			invoke(child, parent)
			_preOrder(child, invoke)
		}
	}

	var preOrder = function (root, rootElement, invoke) {
		//invoke(root, {
		//	_element: rootElement
		//})
		_preOrder(root, invoke)
	}


	var recover = function (dom) {
		addBase()
		var rootElement = fillBody(dom)
		dom._element = rootElement
		preOrder(dom, rootElement, function (child, parent) {
			var childElement = child._element = createElement(child)
			var parentElement = parent._element
			parentElement.appendChild(childElement)
		})
	}

	return recover
})