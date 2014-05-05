function User(server, connection) {
  this.server = server
  this.connection = connection
}
exports.User = User

// Calling this:
//   user.sendReply("001", ":Welcome")
// Sends this:
//   :server.net 001 nickname :Welcome
User.prototype.sendReply = function(code, text) {
  var data = [':' + this.server.name, code, this.nick, text].join(' ')

  this.connection.write(data + '\r\n')
}

User.prototype.pingDelay = 1000 * 30 // 30 sec

User.prototype.pingLater = function() {
  var self = this

  if (this.timer) clearTimeout(this.timer)

  this.timer = setTimeout(function() {

    self.connection.write('PING :' + self.server.name + '\r\n')

  }, this.pingDelay)
}