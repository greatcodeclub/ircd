var _ = require('underscore')

function User(server, connection) {
  this.server = server
  this.connection = connection
  this.channels = []
}
exports.User = User

// Calling this:
//   user.sendReply("001", ":Welcome")
// Sends this:
//   :server.net 001 nickname :Welcome
User.prototype.sendReply = function(code) {
  var args = _.toArray(arguments).slice(1)

  this.send(':' + this.server.name, code, this.nick, args)
}

// Calling this:
//   user.sendCommand(fromUser, "JOIN", "#channel")
// Will send:
//   :from-nick!~from-username@from-hostname JOIN #channel
User.prototype.sendCommand = function(fromUser) {
  var prefix = ":" + fromUser.nick + "!~" + fromUser.username + "@" + fromUser.hostname,
      args = _.toArray(arguments).slice(1)

  this.send(prefix, args)
}

User.prototype.send = function() {
  var data = _.flatten(arguments).join(' ')

  this.connection.write(data + '\r\n')
}