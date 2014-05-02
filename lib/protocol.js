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
  // :server.net 002 nickname :Your host is userhost.com, running version ircd-1.0
  user.sendReply("002", ":Your host is " + user.hostname + ", running version ircd-1.0")
  // :server.net 376 nickname :End of /MOTD command.
  user.sendReply("376", ":End of /MOTD command.")
}