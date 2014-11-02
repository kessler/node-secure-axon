var should = require('should')
var axon = require('axon')
var pem = require('pem')

var secureServer = require('../lib/secureServer.js')
var secureClient = require('../lib/secureClient.js')

describe('push/pull', function() {
	this.timeout(15000)

	var push, pull

	beforeEach(function(done) {
		push = axon.socket('push')
		pull = axon.socket('pull')

		pem.createCertificate({
			days: 1,
			selfSigned: true
		}, function(err, keys) {

			secureClient(pull, {
				key: keys.serviceKey,
				cert: keys.certificate,
				rejectUnauthorized:false
			})

			secureServer(push, {
				key: keys.serviceKey,
				cert: keys.certificate,
				rejectUnauthorized:false
			})

			pull.connect(3001)
			push.bind(3001, done)
		})
	})

	afterEach(function(done) {
		pull.close(function () {
			push.close(done)
		})
	})

	it('connects', function(done) {
		pull.on('message', function (message) {
			console.log(message)
			done()
		})
		push.send('something')		
	})
})
