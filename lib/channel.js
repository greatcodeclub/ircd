var _ = require('underscore')

function Channel(name) {
  this.name = name
  this.users = []
}
exports.Channel = Channel

Channel.prototype.join = function(user) {
  this.users.push(user)
}

Channel.prototype.sendCommand = function(fromUser) {
  var args = _.toArray(arguments).slice(1)

  this.sendCommandTo(this.users, fromUser, args)
}

Channel.prototype.sendCommandToOthers = function(fromUser) {
  var args = _.toArray(arguments).slice(1)
  var others = this.users.filter(function(user) { return user !== fromUser })

  this.sendCommandTo(others, fromUser, args)
}

Channel.prototype.sendCommandTo = function(users, fromUser, args) {
  _.invoke(users, 'sendCommand', fromUser, args)
}