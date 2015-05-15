define(function (require) {
	var $ = require('jquery')

	var addMask = function (element) {
		var rect = element.getBoundingClientRect()
		var x = document.documentElement.scrollLeft + rect.left
		var y = document.documentElement.scrollTop + rect.top

		// create mask
		var mask = document.createElement('div')
		$(mask).css({
			position: 'absolute',
			left: x,
			top: y,
			'z-index': '999999', // make sure at top
			background: 'red',
			opacity: '0.5',
			width: rect.width,
			height: rect.height
		})
		document.documentElement.appendChild(mask)
	}

	return addMask
})