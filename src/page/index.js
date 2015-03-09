define(function (require, exports) {
	var Backbone = require('backbone')
	require('backbone-pouch')
	var PouchDB = require('pouchdb')
	var Case = require('../model/case')
	var Snapshot = require('../model/snapshot')
	var Chance = require('chance')

	exports.init = function () {
		var random = new Chance
		var db = new PouchDB('http://localhost:5984/view')
		Backbone.sync = BackbonePouch.sync({
			db: db
		})


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