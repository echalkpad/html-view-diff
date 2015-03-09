define(function (require, exports) {
	var sync = require('../sync/sync')
	var Case = require('../model/case')
	var Snapshot = require('../model/snapshot')
	var Chance = require('chance')

	exports.init = function () {
		var random = new Chance
		sync.init()


		var c = new Case({
			_id: random.guid(),
			name: '1234',
			snapshots: [
				new Snapshot({
					dom: '123'
				})
			]
		})
		c.save()
		console.log(c.toJSON())
	}
})