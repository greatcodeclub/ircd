var net = require('net'),
    os = require('os'),
    User = require('./user').User,
    Channel = require('./channel').Channel,
    Parser = require('./parser').Parser,
    protocol = require('./protocol')

var server = net.createServer(function(connection) {
  var user = new User(this, connection),
      server = this

  connection.on('data', function(data) {
    var data = data.toString(),
        parser = new Parser()

    process.stdout.write(data)

    parser.onRequest(function(request) {
      server.process(user, request)
    })

    parser.parse(data)
  })
})

server.name = os.hostname()
server.channels = {}

server.log = function(message) {
  console.log(message)
}

server.getChannel = function(name) {
  return this.channels[name] = this.channels[name] || new Channel(name)
}

server.process = function(user, request) {
  var callback = protocol[request.command]

  if (callback) {
    // Call eg.: protocol.JOIN(server, user, request)
    callback(server, user, request)
  }
}

server.start = function() {
  var self = this

  this.listen(6667, function() {
    console.log("Started " + self.name + " on port 6667")
  })
}

module.exports = server
