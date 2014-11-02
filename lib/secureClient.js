var debug = require('debug')('axon:secure')
var tls = require('tls')
var clone = require('clone')
var checkVersion = require('./checkVersion.js')

module.exports = function (socket, options) {

	function socketConnect(sock, port, host, callback) {

		if (typeof host === ' function') {
			callback = host
			host = undefined
		}

		if (host === undefined) {
			host = '0.0.0.0'
		}

		debug('creating secure socket connection %s:%s', host, port)

		var opts = clone (options)
		opts.socket = sock

		opts.port = port
		opts.host = host

		sock.connect(port, host, function () {
			tls.connect(opts, function () {				
				callback && callback()
			})
		})

		return sock
	}

	function plugin(socket) {
		checkVersion(socket)
		socket.socketConnect = socketConnect
	}

	socket.use(plugin)

	return socket
}