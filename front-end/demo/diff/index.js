define(function (require) {
	var diff = require('src/diff/diff')
	var capture = require('bower_components/dom-snapshot/src/document-capture/capture')
	var $ = require('jquery')

	var dom1 = capture($('.old')[0].contentWindow.document)
	var dom2 = capture($('.new')[0].contentWindow.document)

	console.log(diff(dom1, dom2))
})