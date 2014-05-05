var net = require('net')
var os = require('os')
var Parser = require('./parser').Parser
var protocol = require('./protocol')
var User = require('./user').User

var server = net.createServer(function(connection) {
  // Accepted a new connection

  var user = new User(server, connection)
  var parser = new Parser()

  parser.onMessage(function(message) {
    console.log(message)
    server.process(user, message)
  })

  connection.on('data', function(data) {
    var data = data.toString()

    console.log(data)
    parser.parse(data)
    user.pingLater()
  })
})

server.name = os.hostname()

server.listen(6667, function() {
  console.log('Started on port 6667')
})

server.process = function(user, message) {
  var command = protocol[message.command]

  if (command) {
    command(server, user, message)
  }
}