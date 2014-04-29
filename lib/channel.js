var _ = require('underscore')

function Channel(name) {
  this.name = name
  this.users = []
}
exports.Channel = Channel

// Broadcast a command to all users in a channel.
Channel.prototype.sendCommand = function(fromUser) {
  this.sendCommandTo(this.users, fromUser, _.toArray(arguments).slice(1))
}

// Send a message from a user to all users in a channel except the sender.
Channel.prototype.sendCommandToOthers = function(fromUser) {
  var others = this.users.filter(function(user) { return user !== fromUser })

  this.sendCommandTo(others, fromUser, _.toArray(arguments).slice(1))
}

Channel.prototype.sendCommandTo = function(users, fromUser, args) {
  _.invoke(users, 'sendCommand', fromUser, args)
}

// Add a user to the channel.
Channel.prototype.join = function(user) {
  this.users.push(user)
  user.channels.push(this)
}

// Remove a user from the channel.
Channel.prototype.part = function(user) {
  this.users.splice(this.users.indexOf(user), 1)
}