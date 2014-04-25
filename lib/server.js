var net = require('net'),
    User = require('./user').User,
    Channel = require('./channel').Channel,
    Parser = require('./parser').Parser,
    commands = require('./commands')

var server = net.createServer(function(connection) {
  var user = new User(this, connection),
      server = this

  connection.on('data', function(data) {
    var data = data.toString(),
        parser = new Parser()

    process.stdout.write(data)

    parser.onRequest(function(request) {
      console.log(request)
      server.process(user, request)
    })

    parser.parse(data)
  })

  connection.on('end', function() {
    user.disconnect()
  })
})

server.name = 'dev.com'
server.channels = {}

server.getChannel = function(name) {
  return this.channels[name] = this.channels[name] || new Channel(name)
}

server.process = function(user, request) {
  // TODO Validate the command?

  var command = commands[request.command]

  if (command) {
    // Call eg.: commands.JOIN(server, user, request)
    command(server, user, request)
  }
}

server.listen(6667)
