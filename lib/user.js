var _ = require('underscore')

function User(server, connection) {
  this.server = server
  this.connection = connection
  this.channels = []
}
exports.User = User

// Send a reply to the user.
// Calling:
//   user.sendReply(353, "@", "#channel", ":nickname")
// Will send:
//   :server.net 353 nickname @ #channel :nickname
User.prototype.sendReply = function(code) {
  var args = _.toArray(arguments).slice(1)
  
  this.send(":"+this.server.name, code, this.nick, args)
}

// Send a command to from a user
// Calling:
//   user.sendCommand(fromUser, "JOIN", "#channel")
// Will send:
//   :fromUser!~fromUserLogin@fromuserhost.com JOIN #channel
User.prototype.sendCommand = function(fromUser) {
  var prefix = ":" + fromUser.nick + "!~" + fromUser.username + "@" + fromUser.hostname,
      args = _.flatten(arguments).slice(1)
  
  this.send(prefix, args)
}

User.prototype.send = function() {
  var data = _.flatten(arguments).join(' ')
  
  this.server.log(data)
  this.connection.write(data + "\r\n")
}

// Close the connection.
User.prototype.close = function() {
  this.connection.end()
}