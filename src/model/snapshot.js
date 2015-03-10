define(function (require) {
	var Backbone = require('backbone')
	var protobuf = require('protobuf')
	require('backbone-relational')


	var Snapshot = Backbone.RelationalModel.extend({
		defaults: function () {
			return {
				dom: null,
				model: null
			}
		}
	})

	Snapshot.fromProtobuf = function () {

	}

	Snapshot.prototype.toProtobuf = function () {

	}

	return Snapshot
})