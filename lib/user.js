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

  // We reset the timer on each call
  if (this.timer) clearTimeout(this.timer)

  this.timer = setTimeout(function() {
    // Send the ping
    self.connection.write('PING :' + self.server.name + '\r\n')

    // Next time, in 30 sec, close the connection if there is no activity.
    // If there is activity, pingLater will be called again, resetting this timer.
    self.timer = setTimeout(function() {
      self.connection.end()
    }, self.pingDelay)

  }, this.pingDelay)
}