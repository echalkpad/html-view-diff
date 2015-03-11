define(function (require) {
	var deepFirst = require('bower_components/algorithm-data-structure/src/search/deep-first')
	var SnapshotDom = require('../model/snapshot-dom')
	var IdGenerator = require('./id-generator')

	var getCss = function (element) {
		var declaration = getComputedStyle(element)
		var css = {}
		for (var key in declaration) {
			if (!/\d+/.test(key) && declaration.hasOwnProperty(key) && ['parentRule', 'length', 'cssText'].indexOf(key) < 0) {
				css[key] = declaration[key]
			}
		}
		return css
	}

	var getAttributes = function (element) {
		var atts = {}
		var attributes = element.attributes
		for (var i = 0; i < attributes.length; i++) {
			var attNode = attributes[i]
			if (attNode.name == 'id') {
				continue
			}
			atts[attNode.name] = attNode.value
		}
		return atts
	}

	var createState = function (element, g) {
		// concat all text node
		var text = ''
		for (var i = 0; i < element.childNodes.length; i++) {
			var child = element.childNodes[i]
			if (child.nodeType == 3) { // text node
				text += child.textContent
			}
		}

		return {
			element: element,
			data: new SnapshotDom({
				tag: element.tagName, // element.tagName == 'BODY' ? 'DIV' : element.tagName,
				tagId: g.generate(),
				css: getCss(element),
				text: text,
				attributes: getAttributes(element)
			})
		}
	}


	var filter = function (element) {
		if (['SCRIPT'].indexOf(element.tagName) >= 0) {
			return false
		} else {
			return true
		}
	}


	// search 可以重构
	var grab = function (document) {
		var g = new IdGenerator()
		var root = createState(document.getElementsByTagName('body')[0], g)

		deepFirst({
			initial: root,
			next: function (parent, push) {
				var element = parent.element.firstElementChild
				while (true) {
					if (element) {
						if (filter(element)) {
							var child = createState(element, g)
							parent.data.children.push(child.data)
							push(child)
						}
						element = element.nextElementSibling
					} else {
						break
					}
				}
			},
			enter: function (state) {
			}
		})

		return root.data
	}

	return grab
})