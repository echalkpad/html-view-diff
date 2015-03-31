define(function (require, exports) {
	var Backbone = require('backbone')
	var PouchDB = require('pouchdb')
	require('backbone-pouch')


	var BASE_URL = 'http://127.0.0.1:12345'

	exports.init = function () {
		var db = new PouchDB('http://localhost:5984/view')
		Backbone.sync = BackbonePouch.sync({
			db: db
		})
	}

	exports.getSnapshotDom = function (id, done) {
		$.get('http://127.0.0.1:12345/snapshot', function (data) {
			done(data)
		}, 'text')
	}


	/** grab the page */
	exports.grab = function (url, done) {
		$.get(BASE_URL + '/grab', {url: 'xyz'}, function () {
			done()
		})
	}
})