module.exports = function (socket) {

		// check that user has the right axon version
		if (typeof socket.newClientSocket !== 'function' ||
			typeof socket.createServer !== 'function' ||
			typeof socket.socketConnect !== 'function') {

			throw new Error('this axon version is not compatible with this plugin')
		}
}