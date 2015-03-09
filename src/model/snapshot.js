define(function (require) {
	var Backbone = require('backbone')
	require('backbone-relational')

	var Snapshot = Backbone.RelationalModel.extend({
		defaults: function () {
			return {
				dom: null,
				model: null
			}
		}
	})


	return Snapshot
})