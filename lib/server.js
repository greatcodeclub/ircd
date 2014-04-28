var net = require('net'),
    os = require('os'),
    User = require('./user').User,
    Channel = require('./channel').Channel,
    Parser = require('./parser').Parser,
    protocol = require('./protocol')

var server = net.createServer(function(connection) {
  var user = new User(this, connection),
      parser = new Parser(),
      server = this

  parser.onMessage(function(message) {
    server.process(user, message)
  })

  connection.on('data', function(data) {
    var data = data.toString()

    process.stdout.write(data) // use instead of console to avoid double line breaks
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

server.process = function(user, message) {
  var callback = protocol[message.command]

  if (callback) {
    // Call eg.: protocol.JOIN(server, user, message)
    callback(server, user, message)
  }
}

server.listen(6667, function() {
  console.log("Started " + this.name + " on port 6667")
})
