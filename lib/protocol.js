// IRC protocol handler
//
// Each supported command has a corresponding function exported.

exports.NICK = function(server, user, request) {
  user.nick = request.nick
}

exports.USER = function(server, user, request) {
  user.username = request.username
  user.hostname = request.hostname
  user.servername = request.servername
  user.realname = request.realname

  // :server.net 001 nickname :Welcome
  user.sendReply("001", ":Welcome")
  // :server.net 002 nickname :Your host is <userhost>, running version ircd-1.0
  user.sendReply("002", ":Your host is " + user.hostname + ", running version ircd-1.0")
  // :server.net 376 nickname :End of /MOTD command.
  user.sendReply("376", ":End of /MOTD command.")
}

exports.JOIN = function(server, user, request) {
  var channel = server.getChannel(request.channel)

  channel.join(user)

  // :nickname!~login@userhost.com JOIN #channel
  channel.send(user, "JOIN", channel.name)

  // List who's in the channel
  channel.users.forEach(function(channelUser) {
    // :server.net 353 nickname @ #channel :nickname
    user.sendReply("353", "@", channel.name, ':'+channelUser.nick)
  })
  // :server.net 366 nickname #channel :End of /NAMES list.
  user.sendReply("366", channel.name, ":End of /NAMES list.")
}

exports.PRIVMSG = function(server, user, request) {
  var channel = server.getChannel(request.channel)

  // :nickname!~login@userhost.com PRIVMSG #channel :Hi there
  channel.sendToOthers(user, "PRIVMSG", channel.name, ':'+request.message)
}

exports.QUIT = function(server, user, request) {
  user.channels.forEach(function(channel) {
    channel.part(user)
    // :nickname!~login@userhost.com QUIT :Client quit
    channel.send(user, 'QUIT', request.message || ':Client quit')
  })

  user.close()
}
