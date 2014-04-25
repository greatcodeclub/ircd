var _ = require('underscore')

function User(server, connection) {
  this.server = server
  this.connection = connection
  this.channels = []
}
exports.User = User

// Calling:
//   user.sendReply(353, ["@", "#channel", ":nickname"])
// Will send:
//   :server.net 353 nickname @ #channel :@nickname
User.prototype.sendReply = function(code) {
  var args = _.flatten(arguments).slice(1)
  
  this.send(":"+this.server.name, code, this.nick, args)
}

User.prototype.send = function() {
  var data = _.flatten(arguments).join(' ')
  
  console.log(data)
  this.connection.write(data + "\r\n")
}

// Constructor the user identifier
// Eg.: :nickname!~login@userhost.com
User.prototype.identifier = function() {
  return ":" + this.nick + "!~" + this.login + "@" + this.host
}

User.prototype.close = function() {
  this.connection.end()
}