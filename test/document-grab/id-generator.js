define(function (require) {
	var IdGenerator = require('src/document-grab/id-generator')

	module('IdGenerator')

	test('generate()', function (assert) {
		var g = new IdGenerator()
		var a = g.generate()
		var b = g.generate()
		assert.notEqual(a, b)
		assert.equal(a.length, 40)
	})
})