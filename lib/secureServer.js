var debug = require('debug')('axon:secure')
var tls = require('tls')
var checkVersion = require('./checkVersion.js')

module.exports = function (socket, options) {
	
	function createServer(connectionListener) {
		debug('creating secure server')

		return tls.createServer(options, connectionListener)
	}

	function plugin(socket) {
		checkVersion(socket)
		socket.createServer = createServer
	}

	socket.use(plugin)

	return socket
}