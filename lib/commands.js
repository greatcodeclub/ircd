exports.NICK = function(server, user, request) {
  user.nick = request.nick
}

exports.USER = function(server, user, request) {
  user.login = request.login
  user.flags = request.flags
  user.host = request.host
  user.fullName = request.fullName

  user.sendReply("001", ":Welcome")
}

exports.JOIN = function(server, user, request) {
  var channel = server.getChannel(request.channel)

  channel.join(user)
  channel.send(user, ["JOIN", channel.name])

  // List who's in the channel
  channel.users.forEach(function(channelUser) {
    user.sendReply("353", "@", channel.name, ':'+channelUser.nick)
  })
  user.sendReply("366", channel.name, ":End of /NAMES list.")
}

exports.PRIVMSG = function(server, user, request) {
  var channel = server.getChannel(request.channel)

  channel.sendToOthers(user, "PRIVMSG", channel.name, ':'+request.message)
}

exports.QUIT = function(server, user, request) {
  user.channels.forEach(function(channel) {
    channel.part(user)
    channel.send(user, 'QUIT', ':Client quit')
  })

  user.close()
}
