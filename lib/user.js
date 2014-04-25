function User(server, connection) {
  this.server = server
  this.connection = connection
  this.channels = []
}
exports.User = User

User.prototype.identifier = function() {
  // :nickname!~login@userhost.com
  return ":" + this.nick + "!~" + this.login + "@" + this.host
}

User.prototype.send = function(components) {
  var data = components.join(' ')
  console.log(data)
  this.connection.write(data + "\r\n")
}

// Calling:
//   user.sendReply(353, ["@", "#channel", ":@nickname"])
// Will send:
//   :server.net 353 nickname @ #channel :@nickname
User.prototype.sendReply = function(code, args) {
  this.send([":" + this.server.name, code, this.nick].concat(args))
}

User.prototype.disconnect = function() {
  var user = this

  if (this.disconnected) return
  this.disconnected = true

  this.channels.forEach(function(channel) {
    channel.part(user)
    channel.broadcast(user, ['QUIT', ':Client quit'])
  })

  this.connection.end()
}