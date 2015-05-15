define(function (require) {
	var ElementNodeData = require('bower_components/dom-snapshot/src/model/element-node-data')
	var TextNodeData = require('bower_components/dom-snapshot/src/model/text-node-data')
	var diff = require('bower_components/algorithm-tree-edit-distance/src/diff')
	var _ = require('underscore')


	/* Compare font
	 ---------------------
	 color
	 font-size

	 */

	var addCost = function (node) {
		return 1
	}

	var deleteCost = function (node) {
		return 1
	}

	var editCost = function (nodeA, nodeB) {
		if (nodeA.tagName == nodeB.tagName) {
			return 0
		} else {
			return 1
		}
	}


	var compareElementNodeData = function (dataA, dataB) {
		var css = [
			'color', 'font-size'
		]

		return dataA.tagName == dataB.tagName
			&& _.isEqual(dataA.attributes, dataB.attributes)
			&& _.isEqual(
				_.pick(dataA.css, css),
				_.pick(dataB.css, css)
			)
	}

	var compare = function (nodeA, nodeB) {
		if (nodeA instanceof ElementNodeData && nodeB instanceof ElementNodeData) {
			return compareElementNodeData(nodeA, nodeB)
		} else if (nodeA instanceof TextNodeData && nodeB instanceof TextNodeData) {
			return nodeA.text = nodeB.text
		} else {
			return false
		}
	}

	var displayDiff = function (nodeDataA, nodeDataB) {
		return diff(nodeDataA, nodeDataB, {
			compare   : compare,
			addCost   : addCost,
			deleteCost: deleteCost,
			editCost  : editCost
		}).steps // value is not important
	}

	return displayDiff
})