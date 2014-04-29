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

  this.users.forEach(function(user) {
    user.sendCommand(fromUser, args)
  })
}