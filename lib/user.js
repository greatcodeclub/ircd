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
  var args = _.flatten(arguments).slice(1),
      data = [":"+this.server.name, code, this.nick].concat(args).join(' ')
  
  this.server.log(data)
  this.connection.write(data + "\r\n")
}

// Send a command to from a user
// Calling:
//   user.sendCommand(fromUser, "JOIN", "#channel")
// Will send:
//   :fromUser!~fromUserLogin@fromuserhost.com JOIN #channel
User.prototype.sendCommand = function(fromUser) {
  var args = _.flatten(arguments).slice(1),
      prefix = ":" + fromUser.nick + "!~" + fromUser.username + "@" + fromUser.hostname,
      data = [prefix].concat(args).join(' ')
  
  this.server.log(data)
  this.connection.write(data + "\r\n")
}

// Close the connection.
User.prototype.close = function() {
  this.connection.end()
}