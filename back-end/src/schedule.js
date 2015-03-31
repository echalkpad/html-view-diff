var job = require('node-schedule')

job.scheduleJob('51 * * * *', function () {
	console.log('hahah')
})