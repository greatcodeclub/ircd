function Channel(name) {
  this.name = name
  this.users = []
}
exports.Channel = Channel

Channel.prototype.broadcast = function(user, args, onlyOthers) {
  var message = [user.identifier()].concat(args)

  this.users.forEach(function(channelUser) {
    if (!onlyOthers || channelUser !== user) channelUser.send(message)
  })
}

Channel.prototype.join = function(user) {
  this.users.push(user)
  user.channels.push(this)
}

Channel.prototype.part = function(user) {
  this.users.splice(this.users.indexOf(user), 1)
}