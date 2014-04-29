var _ = require('underscore')

function Channel(name) {
  this.name = name
  this.users = []
}
exports.Channel = Channel

// Broadcast a command to all users in a channel.
Channel.prototype.sendCommand = function(fromUser) {
  var args = _.flatten(arguments).slice(1)

  this.users.forEach(function(user) {
    user.sendCommand(fromUser, args)
  })
}

// Send a message from a user to all users in a channel except the sender.
Channel.prototype.sendCommandToOthers = function(fromUser) {
  var args = _.flatten(arguments).slice(1)

  this.users.forEach(function(user) {
    if (user !== fromUser) user.sendCommand(fromUser, args)
  })
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