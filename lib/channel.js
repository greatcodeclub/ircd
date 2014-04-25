var _ = require('underscore')

function Channel(name) {
  this.name = name
  this.users = []
}
exports.Channel = Channel

Channel.prototype.send = function(user) {
  var args = _.flatten(arguments).slice(1)

  this.users.forEach(function(channelUser) {
    channelUser.send(user.identifier(), args)
  })
}

Channel.prototype.sendToOthers = function(user) {
  var args = _.flatten(arguments).slice(1)

  this.users.forEach(function(channelUser) {
    if (channelUser !== user) channelUser.send(user.identifier(), args)
  })
}

Channel.prototype.join = function(user) {
  this.users.push(user)
  user.channels.push(this)
}

Channel.prototype.part = function(user) {
  this.users.splice(this.users.indexOf(user), 1)
}