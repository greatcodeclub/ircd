exports.NICK = function(server, user, message) {
  user.nick = message.nick
}