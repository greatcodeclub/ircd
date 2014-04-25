var _ = require('underscore')

function Channel(name) {
  this.name = name
  this.users = []
}
exports.Channel = Channel

// Send a message from a user to all users in a channel.
// Calling:
//   channel.send(user, "JOIN", "#channel")
// Will send:
//   :usernick!~userlogin@userhost.com JOIN #channel
Channel.prototype.send = function(user) {
  var args = _.flatten(arguments).slice(1)

  this.users.forEach(function(channelUser) {
    channelUser.send(user.identifier(), args)
  })
}

// Send a message from a user to all users in a channel except the sender.
Channel.prototype.sendToOthers = function(user) {
  var args = _.flatten(arguments).slice(1)

  this.users.forEach(function(channelUser) {
    if (channelUser !== user) channelUser.send(user.identifier(), args)
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