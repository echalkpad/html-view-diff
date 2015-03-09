define(function (require, exports) {
	var Backbone = require('backbone')
	var PouchDB = require('pouchdb')
	require('backbone-pouch')

	exports.init = function () {
		var db = new PouchDB('http://localhost:5984/view')
		Backbone.sync = BackbonePouch.sync({
			db: db
		})
	}
})