exports.NICK = function(server, user, request) {
  user.nick = request.nick
}

exports.USER = function(server, user, request) {
  user.login = request.login
  user.flags = request.flags
  user.host = request.host
  user.fullName = request.fullName

  user.sendReply("001", [":Welcome"])
}

exports.JOIN = function(server, user, request) {
  var channel = server.getChannel(request.channel)

  channel.join(user)
  channel.broadcast(user, ["JOIN", channel.name])

  // List who's in the channel
  channel.users.forEach(function(channelUser) {
    user.sendReply("353", ["@", channel.name, ":" + channelUser.nick])
  })
  user.sendReply("366", [channel.name, ":End of /NAMES list."])
}

exports.PRIVMSG = function(server, user, request) {
  var channel = server.getChannel(request.channel)

  channel.broadcast(user, ["PRIVMSG", channel.name, ':' + request.message], true)
}

exports.QUIT = function(server, user, request) {
  user.disconnect()
}
