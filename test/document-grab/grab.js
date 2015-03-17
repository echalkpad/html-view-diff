define(function (require) {
	var $ = require('jquery')
	var _ = require('underscore')
	var grab = require('src/document-grab/grab')

	module('grab')

	test('_getCss()', function (assert) {
		var div = $('<div>')[0]
		$('body').append(div)

		// before
		var css = grab._getCss(div)
		assert.equal(_.keys(css).length, 358) // 358 rules, test in 2015/3/17
		assert.equal(css['backgroundColor'], 'rgba(0, 0, 0, 0)')

		// after
		$(div).css('background-color', 'red')
		css = grab._getCss(div)
		assert.equal(css['backgroundColor'], 'rgb(255, 0, 0)')

		// hide
		$(div).hide()
		css = grab._getCss(div)
		assert.equal(css['backgroundColor'], 'rgb(255, 0, 0)')
	})


	test('_getAttributes()', function (assert) {
		var div = $('<div id="a" class="c1 c2" data="my-data">abc</div>')[0]
		var attrs = grab._getAttributes(div)
		assert.deepEqual(attrs, {
			id: 'a',
			class: 'c1 c2',
			data: 'my-data'
		})
	})


	test('grab()', function () {
		console.log(grab(document))
	})

})