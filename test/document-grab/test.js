define(function (require, exports) {
	var documentGrab = require('src/document-grab/document-grab')
	var IdGenerator = require('src/document-grab/id-generator')
	var $ = require('jquery')
	var protobuf = require('protobuf')


	var addCss = function (node) {
		var css = '#' + node.tagId + '{'
		for (var key in node.css) {
			css += key + ':' + node.css[key] + ';'
		}
		css += '}\n'
		document.styleSheets[0].insertRule(css, 0)
	}

	var createElement = function (node) {
		var element = document.createElement(node.tag)
		element.id = node.tagId
		if (node.text) {
			var textNode = document.createTextNode(node.text)
			element.appendChild(textNode)
		}
		addCss(node)
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

	var enumCss = function (css) {
		var s = ''
		var i = 1
		for (var key in css) {
			s += ['optional string ', key, ' = ', i, ';\n'].join('')
			i++
		}
		console.log(s)
	}

	exports.init = function () {
		//// test IdGenerator
		//var g = new IdGenerator()
		//console.log(g.generate())
		//console.log(g.generate())


		// read wx
		$.get('http://www.baidu.com', function (html) {
			document.write(html)

			setTimeout(function () {
				// test grab
				var dom = documentGrab()
				console.log(dom)
				//console.log(JSON.stringify(dom).length) //4.8M for baidu 首页
				enumCss(dom.css)

				var rootElement = document.createElement('div')
				preOrder(dom, rootElement, function (child, parent) {
					var childElement = child._element = createElement(child)
					var parentElement = parent._element
					parentElement.appendChild(childElement)
				})

				document.documentElement.appendChild(rootElement)
			}, 1000)


		})
	}


	exports.init = function () {
		var builder = protobuf.loadProtoFile('snapshot.proto')
		var ProtoSnapshot = builder.build('Snapshot')
		var model = new ProtoSnapshot({
			dom: {
				tag: 'abcd',
				tagId: 'abcde',
				css: {
					webkitTextCombine: 'asfdasfaaa',
					webkitTextDecorationsInEffect: 'xxxx'
				}
			}
		})
		console.log(model.encode().toBase64())
	}

})