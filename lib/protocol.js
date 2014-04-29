// IRC protocol handler
//
// Each supported command has a corresponding function exported.

exports.NICK = function(server, user, message) {
  user.nick = message.nick
}

exports.USER = function(server, user, message) {
  user.username = message.username
  user.hostname = message.hostname
  user.servername = message.servername
  user.realname = message.realname

  // :server.net 001 nickname :Welcome
  user.sendReply("001", ":Welcome")
  // :server.net 002 nickname :Your host is <userhost>, running version ircd-1.0
  user.sendReply("002", ":Your host is " + user.hostname + ", running version ircd-1.0")
  // :server.net 376 nickname :End of /MOTD command.
  user.sendReply("376", ":End of /MOTD command.")
}

exports.JOIN = function(server, user, message) {
  var channel = server.getChannel(message.channel)

  channel.join(user)

  // :nickname!~login@userhost.com JOIN #channel
  channel.sendCommand(user, "JOIN", channel.name)

  // List who's in the channel
  channel.users.forEach(function(channelUser) {
    // :server.net 353 nickname @ #channel :nickname
    user.sendReply("353", "@", channel.name, ':'+channelUser.nick)
  })
  // :server.net 366 nickname #channel :End of /NAMES list.
  user.sendReply("366", channel.name, ":End of /NAMES list.")
}

exports.PRIVMSG = function(server, user, message) {
  var channel = server.getChannel(message.channel)

  // :nickname!~login@userhost.com PRIVMSG #channel :Hi there
  channel.sendCommandToOthers(user, "PRIVMSG", channel.name, ':'+message.message)
}

exports.QUIT = function(server, user, message) {
  user.channels.forEach(function(channel) {
    channel.part(user)
    // :nickname!~login@userhost.com QUIT :Client quit
    channel.sendCommand(user, 'QUIT', message.message || ':Client quit')
  })

  user.close()
}
